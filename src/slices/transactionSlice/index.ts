import transactionsService, { UserTranasctions } from './transactionService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner';

export const getTransactions = createAsyncThunk(
  'transactions/getTransactions',
  async (params: UserTranasctions, thunkAPI) => {
    try {
      return await transactionsService.getTransactions(params);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export interface Transaction {
  signature: string;
  datasetId: string;
  signer: string;
  seller: string;
  currency: string;
  amount: string;
  timestamp: string;
  permissionHashes: string[];
}

export type DatasetSales = {
  sales: number
  profit: string
}

interface TransactionsProps {
  isLoading: boolean;
  success: boolean | null;
  createTransaction: {
    isLoading: boolean;
    success: boolean | null;
  };
  sendTransaction: {
    isLoading: boolean;
    success: boolean | null;
  };
  getTransactions: {
    isLoading: boolean;
    success: boolean | null;
    transactions: Transaction[];
    purchases: Transaction[];
    sales: Transaction[];
    datasetSales: Record<string, DatasetSales>;
    totalProfit: string | null;
    totalSales: string | null;
  };
}

const initialState: TransactionsProps = {
  isLoading: false,
  success: null,
  createTransaction: {
    isLoading: false,
    success: null,
  },
  sendTransaction: {
    isLoading: false,
    success: null,
  },
  getTransactions: {
    isLoading: false,
    success: null,
    transactions: [],
    purchases: [],
    sales: [],
    datasetSales: {},
    totalProfit: null,
    totalSales: null,
  },
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    resetTransactionsSlice: (state) => {
      state.success = null;
      state.getTransactions.success = null;
      state.getTransactions.transactions = [];
      state.getTransactions.purchases = [];
      state.getTransactions.sales = [];
      state.getTransactions.datasetSales = {};
      state.getTransactions.totalProfit = null;
      state.getTransactions.totalSales = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTransactions.pending, (state) => {
        state.getTransactions.isLoading = true;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.getTransactions.isLoading = false;
        state.getTransactions.success = true;
        state.getTransactions.transactions = [...action.payload.purchases, ...action.payload.sales];
        state.getTransactions.purchases = action.payload.purchases;
        state.getTransactions.sales = action.payload.sales;
        state.getTransactions.datasetSales = action.payload.datasetSales;
        state.getTransactions.totalProfit = action.payload.totalProfit;
        state.getTransactions.totalSales = action.payload.totalSales;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.getTransactions.isLoading = false;
        toast.error(action.payload as string);
      });
  },
});

export const { resetTransactionsSlice } = transactionsSlice.actions;
export const { createTransaction, sendTransaction } = transactionsService;
export default transactionsSlice;