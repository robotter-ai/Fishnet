import transactionService, { InitProductConfig, PurchaseConfig, QueryPurchaseConfig } from "./transactionService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const initProductTree = createAsyncThunk(
    'transaction/initProductTree',
    async (accounts: InitProductConfig, thunkAPI) => {
        try {
            return await transactionService.initProductTree(accounts);
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const registerBuy = createAsyncThunk(
    'transaction/registerBuy',
    async (accounts: PurchaseConfig, thunkAPI) => {
        try {
            return await transactionService.registerBuy(accounts);
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const queryPurchases = createAsyncThunk(
    'transaction/queryPurchases',
    async (accounts: QueryPurchaseConfig, thunkAPI) => {
        try {
            return await transactionService.queryPurchases(accounts);
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

interface IndexerProps {
    isLoading: boolean;
    success: boolean | null;
    dataDetails: any;
    initProductTree: {
        isLoading: boolean;
        success: boolean | null;
        transaction: string | null;
    };
    registerBuy: {
        isLoading: boolean;
        success: boolean | null;
        transaction: string | null;
    };
    queryPurchases: {
        isLoading: boolean;
        success: boolean | null;
        purchases: number | null;
    };
}
  
const initialState: IndexerProps = {
    isLoading: false,
    success: null,
    dataDetails: null,
    initProductTree: {
        isLoading: false,
        success: null,
        transaction: null,
    },
    registerBuy: {
        isLoading: false,
        success: null,
        transaction: null,
    },
    queryPurchases: {
        isLoading: false,
        success: null,
        purchases: null,
    },
};
  
const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        resetTransactionSlice: (state) => {
            state.success = null;
            state.initProductTree.success = null;
            state.initProductTree.transaction = null;
            state.registerBuy.success = null;
            state.registerBuy.transaction = null;
            state.queryPurchases.success = null;
            state.queryPurchases.purchases = null;
        },
    },
    extraReducers(builder) {
        builder
        .addCase(initProductTree.pending, (state) => {
            state.initProductTree.isLoading = true;
        })
        .addCase(initProductTree.fulfilled, (state, action) => {
            state.initProductTree.isLoading = false;
            state.initProductTree.success = true;
            state.initProductTree.transaction = action.payload.transaction;
        })
        .addCase(initProductTree.rejected, (state, action) => {
            state.initProductTree.isLoading = false;
            toast.error(action.payload as string);
        })
    
        .addCase(registerBuy.pending, (state) => {
            state.registerBuy.isLoading = true;
        })
        .addCase(registerBuy.fulfilled, (state, action) => {
            state.registerBuy.isLoading = false;
            state.registerBuy.success = true;
            state.registerBuy.transaction = action.payload.transaction;
        })
        .addCase(registerBuy.rejected, (state, action) => {
            state.registerBuy.isLoading = false;
            toast.error(action.payload as string);
        })
    
        .addCase(queryPurchases.pending, (state) => {
            state.queryPurchases.isLoading = true;
        })
        .addCase(queryPurchases.fulfilled, (state, action) => {
            state.queryPurchases.isLoading = false;
            state.queryPurchases.success = true;
            state.queryPurchases.purchases = action.payload.purchases;
        })
        .addCase(queryPurchases.rejected, (state, action) => {
            state.queryPurchases.isLoading = false;
            toast.error(action.payload as string);
        });
    }, 
});

export const { resetTransactionSlice } = transactionSlice.actions;
export default transactionSlice;
  