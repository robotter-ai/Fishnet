import { TRANSACTIONS_API_URL, getConfig } from "@slices/requestConfig";
import axios from "axios";

export type CreateTransaction = {
    body: {
        datasetId: string;
        signer: string;
    };
};

const createTransaction = async (config: CreateTransaction) => {
    const headersConfig = getConfig(false);
    const { data } = await axios.post(
        `${TRANSACTIONS_API_URL}/solana/createTransaction`,
        config.body,
        headersConfig
    );
    return data;
};

export type SendTransaction = {
    body: {
        datasetId: string;
        transaction: string;
    };
};

const sendTransaction = async (config: SendTransaction) => {
    const headersConfig = getConfig(false);
    const { data } = await axios.post(
        `${TRANSACTIONS_API_URL}/solana/sendTransaction`,
        config.body,
        headersConfig
    );
    return data;
};

const transactionService = {
    createTransaction,
    sendTransaction,
};

export default transactionService;