import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import profileService, { UserProps } from './profileService';

export const getUserInfo = createAsyncThunk(
  'profile/getUserInfo',
  async (address: string, thunkAPI) => {
    try {
      return await profileService.getUserInfo(address);
    } catch (err: any) {
      const errMsg =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      return thunkAPI.rejectWithValue(errMsg);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  'profile/getAllUsers',
  async (_, thunkAPI) => {
    try {
      return await profileService.getAllUsers();
    } catch (err: any) {
      const errMsg =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      return thunkAPI.rejectWithValue(errMsg);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  'profile/updateUserInfo',
  async (data: UserProps, thunkAPI) => {
    try {
      return await profileService.updateUserInfo(data);
    } catch (err: any) {
      const errMsg =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      return thunkAPI.rejectWithValue(errMsg);
    }
  }
);

interface ProfileSliceProps {
  isLoading: boolean;
  success: boolean | null;
  error: any;
  userInfo: UserProps | any;
  updateActions: { isLoading: boolean; success: boolean | null; error: any };
  allUsers: { data: null; isLoading: boolean; success: boolean | null };
}

const initialState: ProfileSliceProps = {
  isLoading: false,
  success: null,
  error: null,
  userInfo: null,
  updateActions: { isLoading: false, success: null, error: null },
  allUsers: { data: null, isLoading: false, success: null },
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetProfileSlice: (state) => {
      state.success = null;
      state.error = null;
    },
    resetUpdateSlice: (state) => {
      state.updateActions.success = null;
      state.updateActions.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.userInfo = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload as string);
      })

      .addCase(getAllUsers.pending, (state) => {
        state.allUsers.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.allUsers.isLoading = false;
        state.allUsers.success = true;
        state.allUsers.data = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.allUsers.isLoading = false;
        toast.error(action.payload as string);
      })

      .addCase(updateUserInfo.pending, (state) => {
        state.updateActions.isLoading = true;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.updateActions.isLoading = false;
        state.updateActions.success = true;
        state.userInfo = action.payload;
        toast.success('Profile have been updated!');
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.updateActions.isLoading = false;
        state.updateActions.error = action.payload;
        toast.error(action.payload as string);
      });
  },
});

export const { resetUpdateSlice, resetProfileSlice } = profileSlice.actions;

export default profileSlice;
