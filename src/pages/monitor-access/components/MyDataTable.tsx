import { useEffect } from 'react';
import Button from '@components/ui/Button';
import { Starred } from '@components/form';
import ClickToCopy from '@shared/components/ClickToCopy';
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
        to={`/data/${item.id_hash}/details`}
        className="text-blue whitespace-nowrap"
      >
        {item.name}
      </Link>
    ),
    isSortable: true,
  },
  {
    header: 'Hash',
    accessor: 'id_hash',
    cell: (item) => (
      <div className="flex gap-3">
        <p className="w-[200px] truncate">{item.id_hash}</p>
        <ClickToCopy text={item.id_hash} />
      </div>
    ),
    isSortable: true,
  },
  {
    header: 'Public access',
    accessor: 'available',
    cell: (item) => (
      <ToggleAvailability available={item.available} datasetId={item.id_hash} />
    ),
    isSortable: true,
  },
  {
    header: 'Description',
    accessor: 'desc',
    cell: (item) => <p className="w-52 line-clamp-3">{item.desc}</p>,
  },
  {
    header: '',
    accessor: 'forgotten',
    cell: (item) => <Starred starred={item.forgotten} />,
  },
  {
    header: 'Filter',
    cell: (item) => (
      <Button
        linkTo={`/monitor-access/${item.id_hash}/settings`}
        text="Settings"
        btnStyle="outline-blue"
      />
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
