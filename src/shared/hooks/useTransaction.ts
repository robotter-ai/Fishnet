import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import { parseEther } from 'viem';
import { usePrepareSendTransaction, useSendTransaction } from 'wagmi';

export default () => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  // const { owner, price } = useAppSelector(
  //   (state) => state.datasets.dataDetails
  // );
  const [dataPrice, setPrice] = useState<string>('0');
  const [recipientAddress, setRecipientAddress] =
    useState<string>('hashtagggsomething');
  const { sendTransaction } = useWallet();
  return { setPrice, setRecipientAddress, sendTransaction };
};
