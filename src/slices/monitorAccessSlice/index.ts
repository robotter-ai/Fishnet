import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

interface StateProps {
  isLoading: boolean;
  success: boolean | null;
  data: null;
}

const initialState: StateProps = {
  isLoading: false,
  success: null,
  data: null,
};

const monitorAccessSlice = createSlice({
  name: 'monitorAccess',
  initialState,
  reducers: {},
});

// export const { } = monitorAccessSlice.actions;

export default monitorAccessSlice;
