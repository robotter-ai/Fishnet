import { createSlice, PayloadAction } from '@reduxjs/toolkit';

enum LoginStatus {
  IN = 'in',
  OUT = 'out',
  REQUESTED = 'requested',
  PENDING = 'pending',
  SIGNING = 'signing',
}

interface AppState {
  pageTitle: string;
  loginStatus?: LoginStatus;
}

const initialState: AppState = {
  pageTitle: '',
  loginStatus: LoginStatus.OUT,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setPageTitle: (state, action: PayloadAction<string>) => {
      state.pageTitle = action.payload;
    },
    setPageDetails: (state, action: PayloadAction<{ pageTitle: string }>) => {
      state.pageTitle = action.payload.pageTitle;
    },
    setLoginStatus: (state, action: PayloadAction<LoginStatus>) => {
      state.loginStatus = action.payload;
    },
  },
});

export const { setPageTitle, setPageDetails, setLoginStatus } =
  appSlice.actions;

export default appSlice;

export { LoginStatus };
