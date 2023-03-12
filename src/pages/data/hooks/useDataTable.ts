import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import usePageTitle from '@shared/hooks/usePageTitle';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';
import { getDatasets } from '@slices/dataSlice';

export default () => {
  const navigate = useNavigate();
  const { setTitle } = usePageTitle();
  const dispatch = useAppDispatch();
  const { isLoading, datasets, error } = useAppSelector(
    (state) => state.datasets
  );

  useEffect(() => {
    setTitle('Data');
    dispatch(getDatasets());
  }, [dispatch]);

  const handleCsvToJson = (file: any) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        navigate(`/data/${'upload'}/details`, { state: results.data[0] });
      },
    });
  };

  return { data: datasets, isLoading, error, handleCsvToJson };
};
