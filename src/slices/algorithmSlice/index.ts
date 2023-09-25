import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'sonner';
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

export const getPublishedAlgorithms = createAsyncThunk(
  'algorithm/getPublishedAlgorithms',
  async (address: string, thunkAPI) => {
    try {
      return await algorithmService.getPublishedAlgorithms(address);
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

export const getExecutionResultByID = createAsyncThunk(
  'algorithm/getExecutionResultByID',
  async (id: string, thunkAPI) => {
    try {
      return await algorithmService.getExecutionResultByID(id);
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
  executionResult: any;
  algorithmByIDActions: { isLoading: boolean; success: boolean | null };
  uploadActions: { isLoading: boolean; success: boolean | null };
  executionActions: { isLoading: boolean; success: boolean | null };
  publishedAlgorithms: { data: any[]; isLoading: boolean };
}

const initialState: StateProps = {
  isLoading: false,
  success: null,
  algorithms: null,
  executions: null,
  algorithmDetails: null,
  executionResult: null,
  algorithmByIDActions: { isLoading: false, success: null },
  uploadActions: { isLoading: false, success: null },
  executionActions: { isLoading: false, success: null },
  publishedAlgorithms: { data: [], isLoading: false },
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

      .addCase(getPublishedAlgorithms.pending, (state) => {
        state.publishedAlgorithms.isLoading = true;
      })
      .addCase(getPublishedAlgorithms.fulfilled, (state, action) => {
        state.publishedAlgorithms.isLoading = false;
        state.publishedAlgorithms.data = action.payload;
      })
      .addCase(getPublishedAlgorithms.rejected, (state) => {
        state.publishedAlgorithms.isLoading = false;
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

      .addCase(getExecutionResultByID.pending, (state) => {
        state.executionActions.isLoading = true;
      })
      .addCase(getExecutionResultByID.fulfilled, (state, action) => {
        state.executionActions.isLoading = false;
        state.executionActions.success = true;
        state.executionResult = action.payload;
      })
      .addCase(getExecutionResultByID.rejected, (state, action) => {
        state.executionActions.isLoading = false;
        toast.error(action.payload as string);
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
