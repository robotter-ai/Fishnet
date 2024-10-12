import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  pageTitle: string;
}

const initialState: AppState = {
  pageTitle: '',
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
  },
});

export const { setPageTitle, setPageDetails } = appSlice.actions;

export default appSlice;
