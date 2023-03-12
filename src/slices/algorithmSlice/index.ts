import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import algorithmService, { UploadAlgorithmProps } from './service';

export const getAlgorithms = createAsyncThunk(
  'algorithm/getAlgorithms',
  async (_, thunkAPI) => {
    try {
      return await algorithmService.getAlgorithms();
    } catch (err: any) {
      const errMsg =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      return thunkAPI.rejectWithValue(errMsg);
    }
  }
);

export const getAlgorithmByID = createAsyncThunk(
  'algorithm/getAlgorithmByID',
  async (id: string, thunkAPI) => {
    try {
      return await algorithmService.getAlgorithmByID(id);
    } catch (err: any) {
      const errMsg =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      return thunkAPI.rejectWithValue(errMsg);
    }
  }
);

export const getExecutions = createAsyncThunk(
  'algorithm/getExecutions',
  async (_, thunkAPI) => {
    try {
      return await algorithmService.getExecutions();
    } catch (err: any) {
      const errMsg =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      return thunkAPI.rejectWithValue(errMsg);
    }
  }
);

export const uploadgetAlgorithm = createAsyncThunk(
  'algorithm/uploadgetAlgorithm',
  async (inputs: UploadAlgorithmProps, thunkAPI) => {
    try {
      return await algorithmService.uploadgetAlgorithm(inputs);
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
  isLoading: boolean;
  success: boolean | null;
  algorithms: any;
  executions: any;
  algorithmDetails: any;
  algorithmByIDActions: { isLoading: boolean; success: boolean | null };
  uploadActions: { isLoading: boolean; success: boolean | null };
  executionActions: { isLoading: boolean; success: boolean | null };
}

const initialState: StateProps = {
  isLoading: false,
  success: null,
  algorithms: null,
  executions: null,
  algorithmDetails: null,
  algorithmByIDActions: { isLoading: false, success: null },
  uploadActions: { isLoading: false, success: null },
  executionActions: { isLoading: false, success: null },
};

const algorithmSlice = createSlice({
  name: 'algorithm',
  initialState,
  reducers: {
    resetUploadActions: (state) => {
      state.uploadActions.isLoading = false;
      state.uploadActions.success = null;
    },
    resetAlgorithmDetails: (state) => {
      state.algorithmDetails = null;
    },
    changeAlgorithmDetails: (
      state,
      action: PayloadAction<{ name: string; value: any }>
    ) => {
      state.algorithmDetails = {
        ...state.algorithmDetails,
        [action.payload.name]: action.payload.value,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAlgorithms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAlgorithms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.algorithms = action.payload;
      })
      .addCase(getAlgorithms.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getAlgorithmByID.pending, (state) => {
        state.algorithmByIDActions.isLoading = true;
      })
      .addCase(getAlgorithmByID.fulfilled, (state, action) => {
        state.algorithmByIDActions.isLoading = false;
        state.algorithmByIDActions.success = true;
        state.algorithmDetails = action.payload;
      })
      .addCase(getAlgorithmByID.rejected, (state) => {
        state.algorithmByIDActions.isLoading = false;
      })

      .addCase(getExecutions.pending, (state) => {
        state.executionActions.isLoading = true;
      })
      .addCase(getExecutions.fulfilled, (state, action) => {
        state.executionActions.isLoading = false;
        state.executionActions.success = true;
        state.executions = action.payload;
      })
      .addCase(getExecutions.rejected, (state) => {
        state.executionActions.isLoading = false;
      })

      .addCase(uploadgetAlgorithm.pending, (state) => {
        state.uploadActions.isLoading = true;
      })
      .addCase(uploadgetAlgorithm.fulfilled, (state, action) => {
        state.uploadActions.isLoading = false;
        state.uploadActions.success = true;
        state.algorithmDetails = action.payload;
      })
      .addCase(uploadgetAlgorithm.rejected, (state, action) => {
        state.uploadActions.isLoading = false;
        toast.error(action.payload as string);
      });
  },
});

export const {
  resetUploadActions,
  resetAlgorithmDetails,
  changeAlgorithmDetails,
} = algorithmSlice.actions;

export default algorithmSlice;
