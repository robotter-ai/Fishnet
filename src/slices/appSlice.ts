import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  pageTitle: string;
  pageStatus: string;
}

const initialState: AppState = {
  pageTitle: '',
  pageStatus: '',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setPageTitle: (state, action: PayloadAction<string>) => {
      state.pageTitle = action.payload;
    },
    setPageDetails: (
      state,
      action: PayloadAction<{ pageTitle: string; pageStatus?: string }>
    ) => {
      state.pageTitle = action.payload.pageTitle;
      state.pageStatus = action.payload.pageStatus || '';
    },
  },
});

export const { setPageTitle, setPageDetails } = appSlice.actions;

export default appSlice;
