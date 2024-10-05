import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBotData } from '@pages/overview-bots/hooks/useProfile';

interface TransactionsState {
  isLoading: boolean;
  success: boolean | null;
  bots: IBotData[];
  usdcBalance: number | null;
}

const initialState: TransactionsState = {
  isLoading: false,
  success: null,
  bots: [],
  usdcBalance: null,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    resetTransactions: (state) => {
      Object.assign(state, initialState);
    },
    setUsdcBalance: (state, action: PayloadAction<number>) => {
      state.usdcBalance = action.payload;
    },
    setBots: (state, action: PayloadAction<IBotData[]>) => {
      state.bots = action.payload;
    },
  },
});

export const {
  resetTransactions,
  setUsdcBalance,
  setBots,
} = transactionsSlice.actions;
export default transactionsSlice.reducer;