import { IBotData } from '@pages/overview-bots/hooks/useProfile';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum LoginStatus {
  IN = 'IN',
  OUT = 'OUT',
  PENDING = 'PENDING',
}

interface PnL {
  value: number;
  percentage: number;
  isPositive: boolean;
  chartData: any[];
}

interface AuthState {
  address: string;
  loginStatus: LoginStatus;
  usdcBalance: number;
  botsData: IBotData[];
}

const initialState: AuthState = {
  address: '',
  loginStatus: LoginStatus.OUT,
  usdcBalance: 0,
  botsData: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setLoginStatus: (state, action: PayloadAction<LoginStatus>) => {
      state.loginStatus = action.payload;
    },
    setUsdcBalance: (state, action: PayloadAction<number>) => {
      state.usdcBalance = action.payload;
    },
    setBotData: (state, action: PayloadAction<IBotData[]>) => {
      state.botsData = action.payload;
    },
    addBot: (state, action: PayloadAction<IBotData>) => {
      state.botsData.unshift(action.payload);
    },
    updateBotStats: (state, action: PayloadAction<Partial<IBotData>>) => {
      const index = state.botsData.findIndex(
        (bot) => bot.id === action.payload.id
      );
      if (index !== -1) {
        state.botsData[index] = { ...state.botsData[index], ...action.payload };
      } else if (action.payload.id) {
        state.botsData.push(action.payload as IBotData);
      }
    },
    resetAuth: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setAddress,
  setLoginStatus,
  setUsdcBalance,
  setBotData,
  addBot,
  updateBotStats,
  resetAuth,
} = authSlice.actions;

export default authSlice.reducer;
