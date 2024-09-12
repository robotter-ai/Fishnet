import { TRANSACTIONS_API_URL } from "@store/config";
import axios from "axios";

export type CreateTransaction = {
    datasetId: string;
    signer: string;
};

const createPaymentTransaction = async (params: CreateTransaction) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const { data } = await axios.get(
        `${TRANSACTIONS_API_URL}/solana/createPaymentTransaction`,
        { headers, params }
    );
    return data;
};

export type SendPaymentTransaction = {
    datasetId: string;
    transaction: string;
};

const sendPaymentTransaction = async (body: SendPaymentTransaction) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const { data } = await axios.post(
        `${TRANSACTIONS_API_URL}/solana/sendPaymentTransaction`,
        body,
        { headers }
    );
    return data;
};

export type UserTranasctions = {
    address: string;
    startDate?: number | undefined;
    endDate?: number | undefined;
    limit?: number | undefined;
    skip?: number | undefined;
    reverse?: boolean | undefined;
}

const getTransactions = async (params: UserTranasctions) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const { data } = await axios.get(
        `${TRANSACTIONS_API_URL}/solana/getTransactions`,
        { headers, params }
    );
    return data;
};

export type CreateTokenAccount = {
    signer: string;
};

const createTokenAccount = async (params: CreateTokenAccount) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    try {
        const response = await axios.get(
            `${TRANSACTIONS_API_URL}/solana/createTokenAccount`,
            { headers, params }
        );
        return response;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response;
        }
        throw error;
    }
};

export type SendTransaction = {
    transaction: string;
};

const sendTransaction = async (body: SendTransaction) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const { data } = await axios.post(
        `${TRANSACTIONS_API_URL}/solana/sendTransaction`,
        body,
        { headers }
    );
    return data;
};

const transactionsService = {
    createPaymentTransaction,
    sendPaymentTransaction,
    createTokenAccount,
    sendTransaction,
    getTransactions,
};

export default transactionsService;