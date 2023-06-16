import { Starred } from '@components/form';
import Button from '@components/ui/Button';
import ClickToCopy from '@shared/components/ClickToCopy';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import { Link } from 'react-router-dom';

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
        btnStyle="outline-blue"
        onClick={handleOpenRefuseAccess}
      />
    </div>
  );
};

const accountColumns = ({
  handleOpenRefuseAccess,
}: TableMapperColumns): ITableColumns[] => [
  {
    header: 'Account name',
    cell: ({ name }) => (
      <Link
        to={`/data/${'dataset-id'}/details`}
        className="text-blue whitespace-nowrap"
      >
        {name}
      </Link>
    ),
    sortWith: 'name',
  },
  {
    header: 'Hash of account',
    cell: ({ requestor }) => (
      <div className="flex gap-3">
        <p className="w-[200px] truncate">{requestor}</p>
        <ClickToCopy text={requestor} />
      </div>
    ),
    sortWith: 'requestor',
  },
  {
    header: 'Usages left',
    cell: ({ maxExecutionCount, executionCount }) => (
      <div className="bg-[#E6EEFF] w-[84px] h-[34px] flex pl-4 items-center rounded-md border border-blue">
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
    cell: ({ forgotten }) => (
      <div className="flex gap-3">
        <Starred starred={forgotten} />
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

const algorithmsColumns = ({
  handleOpenRefuseAccess,
}: TableMapperColumns): ITableColumns[] => [
  {
    header: 'Program name',
    cell: ({ name }) => (
      <Link
        to={`/data/${'dataset-id'}/details`}
        className="text-blue whitespace-nowrap"
      >
        {name}
      </Link>
    ),
    sortWith: 'name',
  },
  {
    header: 'Hash of algorithm',
    cell: ({ algorithmID }) => (
      <div className="flex gap-3">
        <p className="w-[200px] truncate">{algorithmID}</p>
        <ClickToCopy text={algorithmID} />
      </div>
    ),
    sortWith: 'algorithmID',
  },
  {
    header: 'Usages left',
    cell: ({ maxExecutionCount, executionCount }) => (
      <div className="bg-[#E6EEFF] w-[84px] h-[34px] flex pl-4 items-center rounded-md border border-blue">
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

const accountAndAlgorithmColumns = ({
  handleOpenRefuseAccess,
}: TableMapperColumns): ITableColumns[] => [
  {
    header: 'Program name',
    cell: ({ name }) => (
      <Link
        to={`/data/${'dataset-id'}/details`}
        className="text-blue whitespace-nowrap"
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
          <p className="text-blue text-[10px]">Account</p>
          <div className="flex gap-3">
            <p className="w-[200px] truncate">{requestor}</p>
            <ClickToCopy text={requestor} />
          </div>
        </div>
        <div>
          <p className="text-blue text-[10px]">Algorithm</p>
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
      <div className="bg-[#E6EEFF] w-[84px] h-[34px] flex pl-4 items-center rounded-md border border-blue">
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
  handleOpenRefuseAccess,
  datasetPermission,
}: {
  handleOpenRefuseAccess: () => void;
  datasetPermission: any;
}) => {
  const { data, isLoading } = datasetPermission;

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
      title: 'Shared by account',
      columns: accountColumns({ handleOpenRefuseAccess }),
      data: sharedByAcoount,
    },
    {
      title: 'Shared by algorithms',
      columns: algorithmsColumns({ handleOpenRefuseAccess }),
      data: sharedByAlgorithm,
    },
    {
      title: 'Shared by account and algorithm ',
      columns: accountAndAlgorithmColumns({ handleOpenRefuseAccess }),
      data: sharedByAccountAlgorithm,
    },
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
