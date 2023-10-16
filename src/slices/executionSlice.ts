import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';
import { FISHNET_API_URL, getConfig } from './requestConfig';

type ExecEnum = 'algorithmID' | 'datasetID' | 'owner' | 'status';

type ExecutionProps = {
  algorithmID: string;
  datasetID: string;
  owner: string;
  status?: string;
};

export const postExecutionRequest = createAsyncThunk(
  'execution/postExecutionRequest',
  async (inputs: ExecutionProps, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${FISHNET_API_URL}/executions`,
        inputs,
        getConfig()
      );
      return data;
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
  details: ExecutionProps;
  result: any;
}

const initialState: StateProps = {
  isLoading: false,
  success: null,
  details: {
    algorithmID: '',
    datasetID: '',
    owner: '',
    status: 'REQUESTED',
  },
  result: null,
};

export const executionSlice = createSlice({
  name: 'execution',
  initialState,
  reducers: {
    changeExecutionDetails: (
      state,
      action: PayloadAction<{ input: ExecEnum; value: any }>
    ) => {
      state.details = {
        ...state.details,
        [action.payload.input]: action.payload.value,
      };
    },
    resetExecutionDetails: (state) => {
      state.details.algorithmID = '';
      state.details.datasetID = '';
      state.details.status = '';
      state.success = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postExecutionRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postExecutionRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.result = action.payload;
      })
      .addCase(postExecutionRequest.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload as string);
      });
  },
});

export const { changeExecutionDetails, resetExecutionDetails } =
  executionSlice.actions;

export default executionSlice;
