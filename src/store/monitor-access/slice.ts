import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DatasetPermisionProps } from '@store/monitor-access/types';

interface StateProps {
  permissions: DatasetPermisionProps;
}

const initialState: StateProps = {
  permissions: {
    requestor: undefined,
    algorithmID: undefined,
    requestedExecutionCount: undefined,
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
  },
});

export const { onChangePermissionsInput } = monitorAccessSlice.actions;

export default monitorAccessSlice;
