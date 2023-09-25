import transactionService, { InitProductConfig, PurchaseConfig, ValidateSignatureConfig } from "./transactionService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'sonner';

export const initProductTree = createAsyncThunk(
    'transaction/initProductTree',
    async (config: InitProductConfig, thunkAPI) => {
        try {
            return await transactionService.initProductTree(config);
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const registerBuy = createAsyncThunk(
    'transaction/registerBuy',
    async (config: PurchaseConfig, thunkAPI) => {
        try {
            return await transactionService.registerBuy(config);
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const validateSignature = createAsyncThunk(
    'transaction/validateSignature',
    async (config: ValidateSignatureConfig, thunkAPI) => {
        try {
            return await transactionService.validateSignature(config);
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
    validateSignature: {
        isLoading: boolean;
        success: boolean | null;
        message: string | null;
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
    validateSignature: {
        isLoading: false,
        success: null,
        message: null,
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
            state.validateSignature.success = null;
            state.validateSignature.message = null;
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
    
        .addCase(validateSignature.pending, (state) => {
            state.validateSignature.isLoading = true;
        })
        .addCase(validateSignature.fulfilled, (state, action) => {
            state.validateSignature.isLoading = false;
            state.validateSignature.success = true;
            state.validateSignature.message = action.payload.message;
        })
        .addCase(validateSignature.rejected, (state, action) => {
            state.validateSignature.isLoading = false;
            toast.error(action.payload as string);
        });
    }, 
});

export const { resetTransactionSlice } = transactionSlice.actions;
export default transactionSlice;
  