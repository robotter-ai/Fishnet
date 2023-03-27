import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import { getDatasetPermissions } from '@slices/monitorAccessSlice';

export default () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const {
    datasetPermission: { data, isLoading },
  } = useAppSelector((state) => state.monitorAccess);

  useEffect(() => {
    dispatch(getDatasetPermissions(id as string));
  }, []);

  return { data, isLoading };
};
