import { Starred } from '@components/form';
import Button from '@components/ui/Button';
import ClickToCopy from '@components/ui/ClickToCopy';
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
    isSortable: true,
  },
  {
    header: 'Hash of account',
    cell: ({ hash }) => (
      <div className="flex gap-3">
        <p className="w-[200px] truncate">{hash}</p>
        <ClickToCopy text={hash} />
      </div>
    ),
    isSortable: true,
  },
  {
    header: 'Usages left',
    cell: ({ usagesLeft }) => (
      <div className="flex gap-3 justify-left">
        <div className="bg-[#E6EEFF] w-[84px] h-[34px] flex justify-center items-center text-center rounded-md">
          {usagesLeft || '-'}
        </div>
        {usagesLeft === 25 ? (
          <div className="flex justify-center text-blue text-lg items-center h-[34px] w-[34px] shadow-md rounded-md ">
            &#10003;
          </div>
        ) : null}
      </div>
    ),
    isSortable: true,
  },
  {
    header: 'Usage limit',
    cell: ({ usageLimit }) => usageLimit,
    isSortable: true,
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
    isSortable: true,
  },
  {
    header: 'Hash of program',
    cell: ({ hash }) => (
      <div className="flex gap-3">
        <p className="w-[200px] truncate">{hash}</p>
        <ClickToCopy text={hash} />
      </div>
    ),
    isSortable: true,
  },
  {
    header: 'Usages left',
    cell: ({ usagesLeft }) => (
      <div className="flex gap-3 justify-left">
        <div className="bg-[#E6EEFF] w-[84px] h-[34px] flex justify-center items-center text-center rounded-md">
          {usagesLeft || '-'}
        </div>
        {usagesLeft === 25 ? (
          <div className="flex justify-center text-blue text-lg items-center h-[34px] w-[34px] shadow-md rounded-md ">
            &#10003;
          </div>
        ) : null}
      </div>
    ),
    isSortable: true,
  },
  {
    header: 'Usage limit',
    cell: ({ usageLimit }) => usageLimit,
    isSortable: true,
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
    isSortable: true,
  },
  {
    header: 'Hash',
    cell: ({ hash }) => (
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-blue text-[10px]">Account</p>
          <div className="flex gap-3">
            <p className="w-[200px] truncate">{hash}</p>
            <ClickToCopy text={hash} />
          </div>
        </div>
        <div>
          <p className="text-blue text-[10px]">Program</p>
          <div className="flex gap-3">
            <p className="w-[200px] truncate">{hash}</p>
            <ClickToCopy text={hash} />
          </div>
        </div>
      </div>
    ),
    isSortable: true,
  },
  {
    header: 'Usages left',
    cell: ({ usagesLeft }) => (
      <div className="flex gap-3 justify-left">
        <div className="bg-[#E6EEFF] w-[84px] h-[34px] flex justify-center items-center text-center rounded-md">
          {usagesLeft || '-'}
        </div>
        {usagesLeft === 25 ? (
          <div className="flex justify-center text-blue text-lg items-center h-[34px] w-[34px] shadow-md rounded-md ">
            &#10003;
          </div>
        ) : null}
      </div>
    ),
    isSortable: true,
  },
  {
    header: 'Usage limit',
    cell: ({ usageLimit }) => usageLimit,
    isSortable: true,
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
}: {
  handleOpenRefuseAccess: () => void;
}) => {
  const data = [
    {
      name: 'Account <Name>',
      starred: true,
      hash: '8743b52063cd8409g885774...',
      usagesLeft: 25,
      usageLimit: 25,
    },
    {
      name: 'Account <Name>',
      starred: false,
      hash: '8743b52063cd8409g885774...',
      usagesLeft: 0,
      usageLimit: 'Unlimited',
    },
  ];

  const tables = [
    {
      title: 'Shared by account',
      columns: accountColumns({ handleOpenRefuseAccess }),
      data,
    },
    {
      title: 'Shared by algorithms',
      columns: algorithmsColumns({ handleOpenRefuseAccess }),
      data,
    },
    {
      title: 'Shared by account and algorithm ',
      columns: accountAndAlgorithmColumns({ handleOpenRefuseAccess }),
      data,
    },
  ];

  return (
    <div className="flex flex-col gap-7">
      {tables.map((item, i) => (
        <div key={i}>
          <h1>{item.title}</h1>
          <CustomTable data={item.data} columns={item.columns} />
        </div>
      ))}
    </div>
  );
};

export default TableMapper;
