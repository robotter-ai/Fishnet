import { TRANSACTIONS_API_URL } from "@store/config";
import axios from "axios";

export type CreateTransaction = {
    datasetId: string;
    signer: string;
};

const createTransaction = async (params: CreateTransaction) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const { data } = await axios.get(
        `${TRANSACTIONS_API_URL}/solana/createTransaction`,
        { headers, params }
    );
    return data;
};

export type SendTransaction = {
    datasetId: string;
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
    return await axios.get(
        `${TRANSACTIONS_API_URL}/solana/createTokenAccount`,
        { headers, params }
    );
};

export type SendNewTokenAccount = {
    transaction: string;
};

const sendNewTokenAccount = async (params: SendNewTokenAccount) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    return await axios.get(
        `${TRANSACTIONS_API_URL}/solana/sendNewTokenAccount`,
        { headers, params }
    );
};

const transactionsService = {
    createTransaction,
    sendTransaction,
    getTransactions,
    createTokenAccount,
    sendNewTokenAccount
};

export default transactionsService;