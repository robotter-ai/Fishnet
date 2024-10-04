import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Bot } from './types';

interface TransactionsState {
  isLoading: boolean;
  success: boolean | null;
  bots: Bot[];
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
    setBots: (state, action: PayloadAction<Bot[]>) => {
      state.bots = action.payload;
    },
    addBot: (state, action: PayloadAction<Bot>) => {
      state.bots.push(action.payload);
    },
    updateBot: (state, action: PayloadAction<Bot>) => {
      const index = state.bots.findIndex(bot => bot.id === action.payload.id);
      if (index !== -1) {
        state.bots[index] = action.payload;
      }
    },
    removeBot: (state, action: PayloadAction<number>) => {
      state.bots = state.bots.filter(bot => bot.id !== action.payload);
    },
  },
});

export const {
  resetTransactions,
  setUsdcBalance,
  setBots,
  addBot,
  updateBot,
  removeBot,
} = transactionsSlice.actions;
export default transactionsSlice.reducer;