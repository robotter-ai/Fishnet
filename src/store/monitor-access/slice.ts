import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DatasetPermisionProps } from '@store/monitor-access/types';

interface StateProps {
  permissions: DatasetPermisionProps;
  search: string;
}

const initialState: StateProps = {
  permissions: {
    requestor: '',
    algorithmID: '',
    datasetID: '',
  },
  search: '',
};

const monitorAccessSlice = createSlice({
  name: 'monitorAccess',
  initialState,
  reducers: {
    setPermissionsInput: (
      state,
      action: PayloadAction<{
        input: keyof DatasetPermisionProps;
        value: any;
      }>
    ) => {
      state.permissions = {
        ...state.permissions,
        [action.payload.input]: action.payload.value,
      };
    },

    setMonitorAccessSearchInput: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },

    resetPermissionsInput: (state) => {
      state.permissions = initialState.permissions;
    },
  },
});

export const {
  setPermissionsInput,
  resetPermissionsInput,
  setMonitorAccessSearchInput,
} = monitorAccessSlice.actions;

export default monitorAccessSlice;
