import { TRANSACTIONS_API_URL, getConfig } from '@slices/requestConfig';
import axios from 'axios';

export type InitProductConfig = {
  params: {
    signer: string;
    marketplace: string;
    paymentMint: string;
    id: string;
    productPrice: number;
    feeBasisPoints: number;
    height: number;
    buffer: number;
    canopy: number;
    name: string;
    metadataUrl: string;
  };
};

const initProductTree = async (config: InitProductConfig) => {
  const mergedConfig = { ...config, ...getConfig(false) };
  const { data } = await axios.get(
    `${TRANSACTIONS_API_URL}/initProductTree`,
    mergedConfig
  );
  return data;
};

export type PurchaseConfig = {
  params: {
    signer: string;
    marketplace: string;
    productId: string;
    paymentMint: string;
    seller: string;
    marketplaceAuth: string;
    rewardsActive: boolean;
    amount: number;
    name: string;
  };
};

const registerBuy = async (config: PurchaseConfig) => {
  const mergedConfig = { ...config, ...getConfig(false) };
  const { data } = await axios.get(
    `${TRANSACTIONS_API_URL}/registerBuy`,
    mergedConfig
  );
  return data;
};

export type ValidateSignatureConfig = {
  params: {
    signature: string;
    itemHash: string;
  };
};

const validateSignature = async (config: ValidateSignatureConfig) => {
  const mergedConfig = { ...config, ...getConfig(false) };
  const { data } = await axios.get(
    `${TRANSACTIONS_API_URL}/validateSignature`,
    mergedConfig
  );
  return data;
};

const transactionService = {
  initProductTree,
  registerBuy,
  validateSignature,
};

export default transactionService;
