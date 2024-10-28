import {
  useCreateInstanceMutation,
  useStartInstanceMutation,
} from '@store/instances/api';
import { useGetStrategiesQuery } from '@store/strategies/api';
import { useAppSelector } from '@shared/hooks/useStore';
import { useWallet } from '@solana/wallet-adapter-react';
import { VersionedTransaction } from '@solana/web3.js';
import { useCallback } from 'react';
import { Buffer } from 'buffer';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

interface DepositResult {
  botId: number;
  signature: string;
  mangoAccount?: string;
}

interface WithdrawResult {
  signature: string;
}

interface TransactionError extends Error {
  data?: {
    message?: string;
  };
  error?: string;
}

export const useTransactions = () => {
  const { address } = useAppSelector((state) => state.auth);
  const { signTransaction } = useWallet();
  const [createInstance] = useCreateInstanceMutation();
  const [startInstance] = useStartInstanceMutation();
  const { data: strategies } = useGetStrategiesQuery();

  const signAndSendTransaction = useCallback(
    async (transaction: string): Promise<{ signature: string }> => {
      if (!signTransaction) throw new Error('Wallet not connected');

      try {
        const serializedBuffer = Buffer.from(transaction, 'base64');
        const unsignedTransaction =
          VersionedTransaction.deserialize(serializedBuffer);
        const signedTransaction = await signTransaction(unsignedTransaction);
        const signedSerializedBase64 = Buffer.from(
          signedTransaction.serialize()
        ).toString('base64');

        const response = await fetch(
          `${import.meta.env.VITE_TRANSACTIONS_API_URL}/sendTransaction`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ transaction: signedSerializedBase64 }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to send transaction');
        }

        const result = await response.json();
        return { signature: result.signature };
      } catch (error) {
        console.error('Transaction signing or sending failed:', error);
        throw new Error('Failed to sign or send transaction');
      }
    },
    [signTransaction]
  );

  const getRandomStrategy = useCallback(() => {
    if (!strategies) return { name: 'default_strategy', parameters: {} };

    const strategyNames = Object.keys(strategies);
    const randomStrategyName =
      strategyNames[Math.floor(Math.random() * strategyNames.length)];
    const strategyParams = strategies[randomStrategyName];

    const randomizedParams: Record<string, any> = {};
    Object.entries(strategyParams).forEach(([key, value]) => {
      if (typeof value === 'number') {
        randomizedParams[key] = Math.random() * value;
      } else if (Array.isArray(value) && value.length > 0) {
        randomizedParams[key] = value[Math.floor(Math.random() * value.length)];
      } else {
        randomizedParams[key] = value;
      }
    });

    return { name: randomStrategyName, parameters: randomizedParams };
  }, [strategies]);

  const deposit = useCallback(
    async (usdcAmount: string, solAmount: string): Promise<DepositResult> => {
      if (!address) throw new Error('Wallet not connected');

      try {
        const uuid = uuidv4();
        const { parameters: strategyParameters } = getRandomStrategy();

        const instanceResult = await createInstance({
          strategy_name: uuid,
          strategy_parameters: strategyParameters,
          market: 'USDC',
        }).unwrap();
        const { instance_id, wallet_address } = instanceResult;

        const depositResponse = await fetch(
          `${import.meta.env.VITE_TRANSACTIONS_API_URL}/deposit`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              owner: address,
              usdcTreasury: usdcAmount,
              feesAmount: solAmount,
              delegate: wallet_address,
            }),
          }
        );

        const result = await depositResponse.json();
        if (
          !depositResponse.ok ||
          !result ||
          typeof result !== 'object' ||
          !result.transaction ||
          !result.botId
        ) {
          throw new Error(
            result.message || 'Invalid response from deposit request'
          );
        }

        const { signature } = await signAndSendTransaction(result.transaction);

        const startResult = await startInstance({
          instanceId: instance_id,
          strategy_name: uuid, // @todo: wire up user's strategy name in configuration screen
          parameters: strategyParameters,
        }).unwrap();

        console.log('Start instances result:', startResult);

        toast.success(`Deposit successful`);
        return {
          botId: result.botId,
          signature,
          mangoAccount: result.mangoAccount,
        };
      } catch (error: any) {
        const transactionError = error as TransactionError;
        const errorMessage =
          transactionError.error ||
          transactionError.data?.message ||
          transactionError.message;
        toast.error('Error depositing, make sure you have enough SOL and USDC');
        throw Error(errorMessage);
      }
    },
    [address, createInstance, startInstance, signAndSendTransaction]
  );

  const withdraw = useCallback(
    async (botId: number): Promise<WithdrawResult> => {
      if (!address) throw new Error('Wallet not connected');

      try {
        const response = await fetch(
          `${import.meta.env.VITE_TRANSACTIONS_API_URL}/withdraw`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              owner: address,
              botId,
            }),
          }
        );

        const result = await response.json();

        if (
          !response.ok ||
          !result ||
          typeof result !== 'object' ||
          !result.transaction
        ) {
          return { signature: '' };
        }

        const { signature } = await signAndSendTransaction(result.transaction);
        toast.success(`Withdrawal successful`);
        return { signature };
      } catch (error) {
        const transactionError = error as TransactionError;
        const errorMessage =
          transactionError.error ||
          transactionError.data?.message ||
          transactionError.message;
        toast.error(
          'Error withdrawing, make sure you have enough SOL and USDC, contact us'
        );
        throw Error(errorMessage);
      }
    },
    [address, signAndSendTransaction]
  );

  return { deposit, withdraw };
};

export default useTransactions;
