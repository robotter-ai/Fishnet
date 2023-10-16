import {
  AccountsFilters,
  BrickAccountInfo,
  BrickEvent,
  EventsFilters,
  UserTranasctionFilters,
} from 'brick-protocol';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import indexerService from '@slices/indexerSlice/indexerService';
import { toast } from 'sonner';

export const getAccounts = createAsyncThunk(
  'indexer/getAccounts',
  async (filters: AccountsFilters, thunkAPI) => {
    try {
      return await indexerService.getAccounts(filters);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getEvents = createAsyncThunk(
  'indexer/getEvents',
  async (filters: EventsFilters, thunkAPI) => {
    try {
      return await indexerService.getEvents(filters);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getTransactions = createAsyncThunk(
  'indexer/getTransactions',
  async (filters: UserTranasctionFilters, thunkAPI) => {
    try {
      return await indexerService.getTransactions(filters);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface IndexerProps {
  isLoading: boolean;
  success: boolean | null;
  dataDetails: any;
  getAccounts: {
    isLoading: boolean;
    success: boolean | null;
    accounts: BrickAccountInfo[] | null;
  };
  getEvents: {
    isLoading: boolean;
    success: boolean | null;
    events: BrickEvent[] | null;
  };
  getTransactions: {
    isLoading: boolean;
    success: boolean | null;
    transactions: BrickEvent[] | null;
  };
}

const initialState: IndexerProps = {
  isLoading: false,
  success: null,
  dataDetails: null,
  getAccounts: {
    isLoading: false,
    success: null,
    accounts: null,
  },
  getEvents: {
    isLoading: false,
    success: null,
    events: null,
  },
  getTransactions: {
    isLoading: false,
    success: null,
    transactions: null,
  },
};

const indexerSlice = createSlice({
  name: 'indexer',
  initialState,
  reducers: {
    resetDataSlice: (state) => {
      state.success = null;
      state.getAccounts.success = null;
      state.getAccounts.accounts = null;
      state.getEvents.success = null;
      state.getEvents.events = null;
      state.getTransactions.success = null;
      state.getTransactions.transactions = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAccounts.pending, (state) => {
        state.getAccounts.isLoading = true;
      })
      .addCase(getAccounts.fulfilled, (state, action) => {
        state.getAccounts.isLoading = false;
        state.getAccounts.success = true;
        state.getAccounts.accounts = action.payload;
      })
      .addCase(getAccounts.rejected, (state, action) => {
        state.getAccounts.isLoading = false;
        toast.error(action.payload as string);
      })

      .addCase(getEvents.pending, (state) => {
        state.getEvents.isLoading = true;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.getEvents.isLoading = false;
        state.getEvents.success = true;
        state.getEvents.events = action.payload;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.getEvents.isLoading = false;
        toast.error(action.payload as string);
      })

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

export const { resetDataSlice } = indexerSlice.actions;
export default indexerSlice;
