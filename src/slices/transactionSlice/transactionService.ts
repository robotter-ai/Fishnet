import { TRANSACTIONS_API_URL, getConfig } from "@slices/requestConfig";
import axios from "axios";

export type InitProductConfig = {
    params: {
        signer: string
        marketplace: string
        paymentMint: string
        params: {
            id: string
            productPrice: number
            feeBasisPoints: number
            height: number
            buffer: number
            canopy: number
        };
    };
}

const initProductTree = async (config: InitProductConfig) => {
    const mergedConfig = { ...config, ...getConfig(false) };
    const { data } = await axios.get(`${TRANSACTIONS_API_URL}/initProductTree`, mergedConfig);
    return data;
};

export type PurchaseConfig = {
    params: {
        signer: string
        marketplace: string
        product: string
        paymentMint: string
        seller: string
        marketplaceAuth: string
        merkleTree: string
        params: {
            rewardsActive: boolean
            amount: number
            name: string
            uri: string
        }
    };
}

const registerBuy = async (config: PurchaseConfig) => {
    const mergedConfig = { ...config, ...getConfig(false) };
    const { data } = await axios.get(`${TRANSACTIONS_API_URL}/registerBuy`, mergedConfig);
    return data;
};

export type QueryPurchaseConfig = {
    params: {
        ownerAddress: string
        productMint: string
    };
}

const queryPurchases = async (config: QueryPurchaseConfig) => {
    const mergedConfig = { ...config, ...getConfig(false) };
    const { data } = await axios.get(`${TRANSACTIONS_API_URL}/queryPurchases`, mergedConfig);
    return data;
};

const transactionService = {
    initProductTree,
    registerBuy,
    queryPurchases,
};

export default transactionService;