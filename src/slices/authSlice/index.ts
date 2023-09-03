import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getErrMsg from '@shared/utils/getErrMsg';
import authService from './authService';

export const getChallenge = createAsyncThunk(
  'authorization/challenge',
  async (address: string, thunkAPI) => {
    try {
      return await authService.challenge(address, 'SOL');
    } catch (err: any) {
      return thunkAPI.rejectWithValue(getErrMsg(err));
    }
  }
);

export const solveChallenge = createAsyncThunk(
  'authorization/solve',
  async (
    { address, signature }: { address: string; signature: string },
    thunkAPI
  ) => {
    try {
      return await authService.solve(address, signature, 'SOL');
    } catch (err: any) {
      return thunkAPI.rejectWithValue(getErrMsg(err));
    }
  }
);

export const refreshToken = createAsyncThunk(
  'authorization/refresh',
  async (address: string, thunkAPI) => {
    try {
      return await authService.challenge(address, 'SOL');
    } catch (err: any) {
      return thunkAPI.rejectWithValue(getErrMsg(err));
    }
  }
);

interface AuthProps {
  isLoading: boolean;
  success: boolean | null;
  auth: boolean;
  dataDetails: any;
  views: any[];
  getChallenge: {
    isLoading: boolean;
    success: boolean | null;
    challenge: string | null;
  };
  solveChallenge: {
    isLoading: boolean;
    success: boolean | null;
    token: string | null;
    valid_til: number | null;
  };
  refreshToken: {
    isLoading: boolean;
    success: boolean | null;
  };
}

const initialState: AuthProps = {
  isLoading: false,
  success: null,
  auth: false,
  dataDetails: null,
  views: [],
  getChallenge: {
    isLoading: false,
    success: null,
    challenge: null,
  },
  solveChallenge: {
    isLoading: false,
    success: null,
    token: null,
    valid_til: null,
  },
  refreshToken: {
    isLoading: false,
    success: null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthSlice: (state) => {
      state.success = null;
      state.auth = false;
      state.dataDetails = null;
      state.getChallenge.success = null;
      state.getChallenge.challenge = null;
      state.solveChallenge.success = null;
      state.solveChallenge.token = null;
      state.solveChallenge.valid_til = null;
      state.refreshToken.success = null;
    },
    changeAuthDetails: (
      state,
      action: PayloadAction<{ name: string; value: any }>
    ) => {
      state.dataDetails = {
        ...state.dataDetails,
        [action.payload.name]: action.payload.value,
      };
    },
    resetChallengeDetails: (state) => {
      state.getChallenge.success = null;
      state.getChallenge.challenge = null;
      state.solveChallenge.success = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getChallenge.fulfilled, (state, action) => {
        state.getChallenge.isLoading = false;
        state.getChallenge.success = true;
        state.getChallenge.challenge = action.payload.challenge;
      })
      .addCase(solveChallenge.fulfilled, (state, action) => {
        state.solveChallenge.isLoading = false;
        state.solveChallenge.success = true;
        state.solveChallenge.token = action.payload.token;
        state.solveChallenge.valid_til = action.payload.valid_til;
      })
      .addCase(refreshToken.fulfilled, (state) => {
        state.refreshToken.isLoading = false;
        state.refreshToken.success = true;
      })
      .addCase(getChallenge.rejected, (state) => {
        state.getChallenge.isLoading = false;
        state.getChallenge.success = false;
      })
      .addCase(solveChallenge.rejected, (state) => {
        state.solveChallenge.isLoading = false;
        state.solveChallenge.success = false;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.refreshToken.isLoading = false;
        state.refreshToken.success = false;
      });
  },
});

export const { resetChallengeDetails } = authSlice.actions;
// export const {} = authSlice.actions;

export default authSlice;
