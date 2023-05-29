import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import getErrMsg from '@shared/utils/getErrMsg';
import { RootState } from 'src/store';
import monitorAccessService, { DatasetPermisionRequestProps } from './service';

export const getIncomingPermissions = createAsyncThunk(
  'monitorAccess/getIncomingPermissions',
  async (address: string, thunkAPI) => {
    try {
      return await monitorAccessService.getIncomingPermissions(address);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(getErrMsg(err));
    }
  }
);

export const getOutgoingPermissions = createAsyncThunk(
  'monitorAccess/getOutgoingPermissions',
  async (address: string, thunkAPI) => {
    try {
      return await monitorAccessService.getOutgoingPermissions(address);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(getErrMsg(err));
    }
  }
);

export const getDatasetPermissions = createAsyncThunk(
  'monitorAccess/getDatasetPermissions',
  async (dataset_id: string, thunkAPI) => {
    try {
      return await monitorAccessService.getDatasetPermissions(dataset_id);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(getErrMsg(err));
    }
  }
);

export const requestDatasetPermissions = createAsyncThunk(
  'monitorAccess/requestDatasetPermissions',
  async (dataset_id: string, thunkAPI) => {
    try {
      const {
        monitorAccess: {
          requestDatasetPermissionActions: { inputs },
        },
      } = thunkAPI.getState() as RootState;
      return await monitorAccessService.requestDatasetPermissions(
        dataset_id,
        inputs
      );
    } catch (err: any) {
      return thunkAPI.rejectWithValue(getErrMsg(err));
    }
  }
);

export const denyPermissions = createAsyncThunk(
  'monitorAccess/denyPermissions',
  async (item_hashes: string[], thunkAPI) => {
    try {
      return await monitorAccessService.denyPermissions(item_hashes);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(getErrMsg(err));
    }
  }
);

interface StateProps {
  incomingPermissions: any;
  outgoingPermissions: any;
  incomingActions: { isLoading: boolean; success: any };
  outgoingActions: { isLoading: boolean; success: any };
  datasetPermission: { data: any; isLoading: boolean; success: any };
  requestDatasetPermissionActions: {
    isLoading: boolean;
    success: any;
    inputs: DatasetPermisionRequestProps;
  };
  denyPermissionsActions: {
    isLoading: boolean;
    success: any;
  };
}

const initialStateRequestInputs = {
  requestor: '',
  algorithmID: '',
  requestedExecutionCount: 0,
};

const initialState: StateProps = {
  incomingPermissions: null,
  outgoingPermissions: null,
  incomingActions: { isLoading: false, success: null },
  outgoingActions: { isLoading: false, success: null },
  datasetPermission: { data: null, isLoading: false, success: null },
  requestDatasetPermissionActions: {
    isLoading: false,
    success: null,
    inputs: initialStateRequestInputs,
  },
  denyPermissionsActions: {
    isLoading: false,
    success: null,
  },
};

const monitorAccessSlice = createSlice({
  name: 'monitorAccess',
  initialState,
  reducers: {
    changeDatasetPermissionInput: (
      state,
      action: PayloadAction<{
        input: 'requestor' | 'algorithmID' | 'requestedExecutionCount';
        value: any;
      }>
    ) => {
      state.requestDatasetPermissionActions.inputs = {
        ...state.requestDatasetPermissionActions.inputs,
        [action.payload.input]: action.payload.value,
      };
    },
    resetPermissions: (state) => {
      state.requestDatasetPermissionActions.success = null;
      state.denyPermissionsActions.success = null;
      state.requestDatasetPermissionActions.inputs = initialStateRequestInputs;
    },
  },
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
      })

      .addCase(getDatasetPermissions.pending, (state) => {
        state.datasetPermission.isLoading = true;
      })
      .addCase(getDatasetPermissions.fulfilled, (state, action) => {
        state.datasetPermission.isLoading = false;
        state.datasetPermission.success = true;
        state.datasetPermission.data = action.payload;
      })
      .addCase(getDatasetPermissions.rejected, (state, action) => {
        state.datasetPermission.isLoading = false;
        toast.error(action.payload as string);
      })

      .addCase(requestDatasetPermissions.pending, (state) => {
        state.requestDatasetPermissionActions.isLoading = true;
      })
      .addCase(requestDatasetPermissions.fulfilled, (state) => {
        state.requestDatasetPermissionActions.isLoading = false;
        state.requestDatasetPermissionActions.success = true;
        toast.success('The access have been created!');
      })
      .addCase(requestDatasetPermissions.rejected, (state, action) => {
        state.requestDatasetPermissionActions.isLoading = false;
        toast.error(action.payload as string);
      })

      .addCase(denyPermissions.pending, (state) => {
        state.denyPermissionsActions.isLoading = true;
      })
      .addCase(denyPermissions.fulfilled, (state) => {
        state.denyPermissionsActions.isLoading = false;
        state.denyPermissionsActions.success = true;
        toast.success('Permissions have been updated!');
      })
      .addCase(denyPermissions.rejected, (state, action) => {
        state.denyPermissionsActions.isLoading = false;
        toast.error(action.payload as string);
      });
  },
});

export const { changeDatasetPermissionInput, resetPermissions } =
  monitorAccessSlice.actions;

export default monitorAccessSlice;
