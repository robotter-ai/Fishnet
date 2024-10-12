import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBotData } from '@pages/overview-bots/hooks/useProfile';

interface BotStats {
  mango_account: string;
  pnl: number;
  portfolio_value: number;
  accuracy: number;
  sharpe_ratio: number;
  apr: number;
  last_updated: number;
}

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
    updateBotStats: (state, action: PayloadAction<Partial<IBotData>>) => {
      const index = state.bots.findIndex((bot) => bot.id === action.payload.id);
      if (index !== -1) {
        // Update existing bot stats
        state.bots[index] = {
          ...state.bots[index],
          ...action.payload,
        };
      } else if (action.payload.id !== undefined) {
        // Add new bot stats if a full bot object is provided
        state.bots.push(action.payload as IBotData);
      }
    },
  },
});

export const { resetTransactions, setUsdcBalance, setBots, updateBotStats } =
  transactionsSlice.actions;
export default transactionsSlice.reducer;
