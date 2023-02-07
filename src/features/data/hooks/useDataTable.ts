import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import useTitle from '@shared/hooks/useTitle';
import { getDatasets } from '../slices/dataSlice';

export default () => {
  const { setTitle } = useTitle();
  const dispatch = useAppDispatch();
  const { isLoading, datasets, error } = useAppSelector(
    (state) => state.datasets
  );

  useEffect(() => {
    setTitle('Data');
    dispatch(getDatasets());
  }, [dispatch]);

  return { data: datasets, isLoading, error };
};
