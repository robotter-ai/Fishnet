import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import { Link, useParams } from 'react-router-dom';
import { useGetDatasetPermissionsQuery } from '@store/monitor-access/api';
import { Transaction } from '@slices/transactionSlice';
import dayjs from 'dayjs';
import TruncatedAddress from '@shared/components/TruncatedAddress';

interface TableMapperColumns {
  handleOpenRefuseAccess: () => void;
}

// const RefuseAccess = ({
//   handleOpenRefuseAccess,
// }: {
//   handleOpenRefuseAccess: () => void;
// }) => {
//   return (
//     <div className="flex justify-end">
//       <Button
//         text="Refuse"
//         btnStyle="outline-primary"
//         onClick={handleOpenRefuseAccess}
//       />
//     </div>
//   );
// };

const SALES_COLUMNS: ITableColumns[] = [
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
    cell: () => '',
    sortWith: 'maxExecutionCount',
  },
];

const MANUAL_ACCESS_COLUMNS = ({
  handleOpenRefuseAccess,
}: TableMapperColumns): ITableColumns[] => [
  {
    header: 'USERS WALLET',
    cell: ({ requestor }) => <TruncatedAddress address={requestor} copy />,
    sortWith: 'requestor',
  },
  {
    header: 'PROFILE BIO',
    cell: () => '',
    sortWith: 'requestor',
  },
  {
    header: 'ACCESS DATE',
    cell: ({ timestamp }) => dayjs.unix(timestamp).format('DD-MM-YYYY HH:MM'),
    sortWith: 'timestamp',
  },
  {
    header: 'DLs',
    cell: () => '',
    sortWith: 'maxExecutionCount',
  },
  {
    header: 'Buy PRICE',
    cell: () => '',
    sortWith: 'maxExecutionCount',
  },
];

const TableMapper = ({
  sales,
  handleOpenRefuseAccess,
}: {
  sales: Transaction[];
  handleOpenRefuseAccess: () => void;
}) => {
  const { id } = useParams();

  const { data, isLoading } = useGetDatasetPermissionsQuery({
    dataset_id: id as string,
  });

  const tables = [
    {
      title: 'Sales',
      columns: SALES_COLUMNS,
      data: sales,
    },
    {
      title: 'Manual access',
      columns: MANUAL_ACCESS_COLUMNS({ handleOpenRefuseAccess }),
      data,
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
