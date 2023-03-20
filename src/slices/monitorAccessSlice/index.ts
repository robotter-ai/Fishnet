import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import monitorAccessService from './service';

export const getIncomingPermissions = createAsyncThunk(
  'monitorAccess/getIncomingPermissions',
  async (user_id: string, thunkAPI) => {
    try {
      return await monitorAccessService.getIncomingPermissions(user_id);
    } catch (err: any) {
      const errMsg =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      return thunkAPI.rejectWithValue(errMsg);
    }
  }
);

export const getOutgoingPermissions = createAsyncThunk(
  'monitorAccess/getOutgoingPermissions',
  async (user_id: string, thunkAPI) => {
    try {
      return await monitorAccessService.getOutgoingPermissions(user_id);
    } catch (err: any) {
      const errMsg =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      return thunkAPI.rejectWithValue(errMsg);
    }
  }
);

interface StateProps {
  incomingPermissions: any;
  outgoingPermissions: any;
  incomingActions: { isLoading: boolean; success: any };
  outgoingActions: { isLoading: boolean; success: any };
}

const initialState: StateProps = {
  incomingPermissions: null,
  outgoingPermissions: null,
  incomingActions: { isLoading: false, success: null },
  outgoingActions: { isLoading: false, success: null },
};

const monitorAccessSlice = createSlice({
  name: 'monitorAccess',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getIncomingPermissions.pending, (state) => {
        state.incomingActions.isLoading = true;
      })
      .addCase(getIncomingPermissions.fulfilled, (state, action) => {
        state.incomingActions.isLoading = false;
        state.incomingActions.success = true;
        state.incomingPermissions = action.payload;
      })
      .addCase(getIncomingPermissions.rejected, (state, action) => {
        state.incomingActions.isLoading = false;
        toast.error(action.payload as string);
      })

      .addCase(getOutgoingPermissions.pending, (state) => {
        state.outgoingActions.isLoading = true;
      })
      .addCase(getOutgoingPermissions.fulfilled, (state, action) => {
        state.outgoingActions.isLoading = false;
        state.outgoingActions.success = true;
        state.outgoingPermissions = action.payload;
      })
      .addCase(getOutgoingPermissions.rejected, (state, action) => {
        state.outgoingActions.isLoading = false;
        toast.error(action.payload as string);
      });
  },
});

export default monitorAccessSlice;
