import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'sonner';
import getErrMsg from '@shared/utils/getErrMsg';
import { RootState } from 'src/store';
import monitorAccessService, { DatasetPermisionProps } from './service';

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
          requestDatasetPermissionActions: { dataset },
        },
      } = thunkAPI.getState() as RootState;
      return await monitorAccessService.requestDatasetPermissions(
        dataset_id,
        dataset
      );
    } catch (err: any) {
      return thunkAPI.rejectWithValue(getErrMsg(err));
    }
  }
);

export const grantDatasetPermissions = createAsyncThunk(
  'monitorAccess/grantDatasetPermissions',
  async (
    {
      dataset_id,
      dataset,
    }: { dataset_id: string; dataset: DatasetPermisionProps },
    thunkAPI
  ) => {
    try {
      return await monitorAccessService.grantDatasetPermissions(
        dataset_id,
        dataset
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
    dataset: DatasetPermisionProps;
  };
  grantDatasetPermissionActions: {
    isLoading: boolean;
    success: any;
    dataset: DatasetPermisionProps;
  };
  denyPermissionsActions: {
    isLoading: boolean;
    success: any;
  };
}

const initialStateRequestInputs: DatasetPermisionProps = {
  requestor: undefined,
  algorithmID: undefined,
  requestedExecutionCount: undefined,
};

const initialStateGrantInputs: DatasetPermisionProps = {
  authorizer: '',
  requestor: '',
  algorithmID: '',
  maxExecutionCount: 32,
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
    dataset: initialStateRequestInputs,
  },
  grantDatasetPermissionActions: {
    isLoading: false,
    success: null,
    dataset: initialStateGrantInputs,
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
        input: keyof DatasetPermisionProps;
        value: any;
      }>
    ) => {
      state.requestDatasetPermissionActions.dataset = {
        ...state.requestDatasetPermissionActions.dataset,
        [action.payload.input]: action.payload.value,
      };
    },
    resetPermissions: (state) => {
      state.requestDatasetPermissionActions.success = null;
      state.grantDatasetPermissionActions.success = null;
      state.denyPermissionsActions.success = null;
      state.requestDatasetPermissionActions.dataset = initialStateRequestInputs;
      state.grantDatasetPermissionActions.dataset = initialStateGrantInputs;
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
      })

      .addCase(grantDatasetPermissions.pending, (state) => {
        state.grantDatasetPermissionActions.isLoading = true;
      })
      .addCase(grantDatasetPermissions.fulfilled, (state) => {
        state.grantDatasetPermissionActions.isLoading = false;
        state.grantDatasetPermissionActions.success = true;
        toast.success('Permissions have been updated!');
      })
      .addCase(grantDatasetPermissions.rejected, (state, action) => {
        state.grantDatasetPermissionActions.isLoading = false;
        toast.error(action.payload as string);
      });
  },
});

export const { changeDatasetPermissionInput, resetPermissions } =
  monitorAccessSlice.actions;

export default monitorAccessSlice;
