import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DatasetPermisionProps } from '@store/monitor-access/types';

interface StateProps {
  permissions: DatasetPermisionProps;
}

const initialState: StateProps = {
  permissions: {
    requestor: '',
    algorithmID: '',
    datasetID: '',
  },
};

const monitorAccessSlice = createSlice({
  name: 'monitorAccess',
  initialState,
  reducers: {
    onChangePermissionsInput: (
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

    resetPermissionsInput: (state) => {
      state.permissions = initialState.permissions;
    },
  },
});

export const { onChangePermissionsInput, resetPermissionsInput } =
  monitorAccessSlice.actions;

export default monitorAccessSlice;
