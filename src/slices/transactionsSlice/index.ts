import transactionsService, { UserTranasctions } from './transactionsService';
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
    transactions: Transaction[] | null;
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
    transactions: null,
  },
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    resetDataSlice: (state) => {
      state.success = null;
      state.getTransactions.success = null;
      state.getTransactions.transactions = null;
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
        state.getTransactions.transactions = action.payload;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.getTransactions.isLoading = false;
        toast.error(action.payload as string);
      });
  },
});

export const { resetDataSlice } = transactionsSlice.actions;
export const { createTransaction, sendTransaction } = transactionsService;
export default transactionsSlice;
