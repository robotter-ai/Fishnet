import { Starred } from '@components/form';
import Button from '@components/ui/Button';
import ClickToCopy from '@shared/components/ClickToCopy';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import { Link, useParams } from 'react-router-dom';
import { useGetDatasetPermissionsQuery } from '@store/monitor-access/api';
import { DatasetPermisionProps } from '@store/monitor-access/types';
import { Transaction } from '@slices/transactionSlice';
import dayjs from 'dayjs';

interface TableMapperColumns {
  handleOpenRefuseAccess: () => void;
}

const RefuseAccess = ({
  handleOpenRefuseAccess,
}: {
  handleOpenRefuseAccess: () => void;
}) => {
  return (
    <div className="flex justify-end">
      <Button
        text="Refuse"
        btnStyle="outline-primary"
        onClick={handleOpenRefuseAccess}
      />
    </div>
  );
};

const SALES_COLUMNS = ({
  handleOpenRefuseAccess,
}: TableMapperColumns): ITableColumns[] => [
  {
    header: 'USERS WALLET',
    cell: ({ signer }) => (
      <Link
        to={`/data/${'dataset-id'}`}
        className="text-primary whitespace-nowrap"
      >
        {signer}
      </Link>
    ),
    sortWith: 'requestor',
  },
  {
    header: 'DATE',
    cell: (item) => dayjs(item.timestamp).format('DD.MM.YYYY'),
    sortWith: 'timestamp',
  },
  {
    header: 'PRICE',
    cell: (item) => item.amount,
    sortWith: 'item',
  },
  {
    header: 'DLs',
    cell: ({ maxExecutionCount }) => '',
    sortWith: 'maxExecutionCount',
  },
];

const MANUAL_ACCESS_COLUMNS = ({
  handleOpenRefuseAccess,
}: TableMapperColumns): ITableColumns[] => [
  {
    header: 'USERS WALLET',
    cell: ({ name }) => (
      <Link
        to={`/data/${'dataset-id'}`}
        className="text-primary whitespace-nowrap"
      >
        {name}
      </Link>
    ),
    sortWith: 'name',
  },
  {
    header: 'PROFILE BIO',
    cell: ({ requestor }) => (
      <div className="flex gap-3">
        <p className="w-[200px] truncate">{requestor}</p>
        <ClickToCopy text={requestor} />
      </div>
    ),
    sortWith: 'requestor',
  },
  {
    header: 'ACCESS DATE',
    cell: ({ maxExecutionCount, executionCount }) => '',
    sortWith: 'requestor',
  },
  {
    header: 'DLs',
    cell: ({ maxExecutionCount }) => '',
    sortWith: 'maxExecutionCount',
  },
  {
    header: 'Buy PRICE',
    cell: ({ forgotten }) => '',
    sortWith: 'maxExecutionCount',
  },
];

const accountAndAlgorithmColumns = ({
  handleOpenRefuseAccess,
}: TableMapperColumns): ITableColumns[] => [
  {
    header: 'Program name',
    cell: ({ name }) => (
      <Link
        to={`/data/${'dataset-id'}`}
        className="text-primary whitespace-nowrap"
      >
        {name}
      </Link>
    ),
    sortWith: 'name',
  },
  {
    header: 'Hash',
    cell: ({ requestor, algorithmID }) => (
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-primary text-[10px]">Account</p>
          <div className="flex gap-3">
            <p className="w-[200px] truncate">{requestor}</p>
            <ClickToCopy text={requestor} />
          </div>
        </div>
        <div>
          <p className="text-primary text-[10px]">Algorithm</p>
          <div className="flex gap-3">
            <p className="w-[200px] truncate">{algorithmID}</p>
            <ClickToCopy text={algorithmID} />
          </div>
        </div>
      </div>
    ),
    sortWith: 'requestor',
  },
  {
    header: 'Usages left',
    cell: ({ maxExecutionCount, executionCount }) => (
      <div className="bg-[#E6EEFF] w-[84px] h-[34px] flex pl-4 items-center rounded-md border border-primary">
        {Number(maxExecutionCount) - Number(executionCount)}
      </div>
    ),
  },
  {
    header: 'Usage limit',
    cell: ({ maxExecutionCount }) => maxExecutionCount,
    sortWith: 'maxExecutionCount',
  },
  {
    header: '',
    cell: ({ starred }) => (
      <div className="flex gap-3">
        <Starred starred={starred} />
      </div>
    ),
  },
  {
    header: '',
    cell: () => (
      <RefuseAccess handleOpenRefuseAccess={handleOpenRefuseAccess} />
    ),
  },
];

const TableMapper = ({
  sales,
  permissions,
  handleOpenRefuseAccess,
}: {
  sales: Transaction[]
  permissions: DatasetPermisionProps
  handleOpenRefuseAccess: () => void;
}) => {
  const { id } = useParams();

  const { data, isLoading } = useGetDatasetPermissionsQuery({
    dataset_id: id as string,
  });

  const sharedByAcoount = data?.filter(
    (item: any) => !!item.requestor && !item.algorithmID
  );
  const sharedByAlgorithm = data?.filter(
    (item: any) => !!item.algorithmID && !item.requestor
  );
  const sharedByAccountAlgorithm = data?.filter(
    (item: any) => !!item.requestor && !!item.algorithmID
  );

  const tables = [
    {
      title: 'Sales',
      columns: SALES_COLUMNS({ handleOpenRefuseAccess }),
      data: sales,
    },
    {
      title: 'Manual access',
      columns: MANUAL_ACCESS_COLUMNS({ handleOpenRefuseAccess }),
      data: sharedByAlgorithm,
    },
    // {
    //   title: 'Shared by account and algorithm ',
    //   columns: accountAndAlgorithmColumns({ handleOpenRefuseAccess }),
    //   data: sharedByAccountAlgorithm,
    // },
  ];

  return (
    <div className="flex flex-col gap-7">
      {tables.map((item, i) => (
        <div key={i}>
          <h1>{item.title}</h1>
          <CustomTable
            data={item.data}
            columns={item.columns}
            isLoading={isLoading}
          />
        </div>
      ))}
    </div>
  );
};

export default TableMapper;
