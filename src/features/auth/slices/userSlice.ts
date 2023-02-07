import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  address: string | any;
  isConnected: boolean;
}

const initialState: AppState = {
  address: '',
  isConnected: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AppState>) => {
      state.address = action.payload.address;
      state.isConnected = action.payload.isConnected;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice;
