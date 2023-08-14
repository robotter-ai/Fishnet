import { useEffect } from 'react';
import Button from '@components/ui/Button';
import { Starred } from '@components/form';
import { Link } from 'react-router-dom';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import { getPublishedDatasets } from '@slices/dataSlice';
import ToggleAvailability from '@shared/components/ToggleAvailability';
import useAuth from '@shared/hooks/useAuth';

const COLUMNS: ITableColumns[] = [
  {
    header: 'Name',
    accessor: 'name',
    cell: (item) => (
      <Link
        to={`/data/${item.item_hash}/details`}
        className="text-blue whitespace-nowrap"
      >
        {item.name}
      </Link>
    ),
    sortWith: 'name',
  },
  {
    header: 'Public access',
    accessor: 'available',
    cell: (item) => (
      <ToggleAvailability
        available={item.available}
        datasetId={item.item_hash}
      />
    ),
    sortWith: 'available',
  },
  {
    header: 'Description',
    accessor: 'desc',
    cell: (item) => <p className="w-52 line-clamp-3">{item.desc}</p>,
    sortWith: 'desc',
  },
  {
    header: '',
    accessor: 'forgotten',
    cell: (item) => <Starred starred={item.forgotten} />,
  },
  {
    header: 'Filter',
    cell: (item) => (
      <div className="w-auto flex items-end justify-end">
        <Button
          href={`/monitor-access/${item.item_hash}/settings`}
          text="Settings"
          size="sm"
          icon="settings"
          btnStyle="outline-blue"
        />
      </div>
    ),
  },
];

const MyDataTable = () => {
  const dispatch = useAppDispatch();
  const auth = useAuth();
  const { publishedDatasets } = useAppSelector((state) => state.datasets);

  useEffect(() => {
    dispatch(getPublishedDatasets(auth?.address));
  }, []);

  return (
    <CustomTable
      data={publishedDatasets.data}
      columns={COLUMNS}
      isLoading={publishedDatasets.isLoading}
    />
  );
};

export default MyDataTable;
