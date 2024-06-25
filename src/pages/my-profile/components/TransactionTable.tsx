import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import dayjs from 'dayjs';

const COLUMNS = (address: string): ITableColumns[] => [
  {
    header: 'DATASET',
    cell: (item) => (
      <span className="text-primary">{item.datasetName}</span>
    ),
    sortWith: 'typ',
  },
  {
    header: 'TYP',
    cell: (item) => (
      <span className="flex gap-2 items-center">
        {item.signer === address ? (
          <>
            <span className="text-danger">Bought</span>
          </>
        ) : (
          <>
            <span className="text-success">Sold</span>
          </>
        )}
      </span>
    ),
    sortWith: 'typ',
  },
  {
    header: 'AMOUNT',
    cell: (item) => `${item.amount} USDC`,
    sortWith: 'typ',
  },
  {
    header: 'DATE',
    cell: (item) => dayjs(item.timestamp).format('DD.MM.YYYY'),
    sortWith: 'typ',
  },
];

const TransactionTable = ({ data, address }: {
  data: any;
  address: string;
}) => {
  console.log(data)
  return (
    <div>
      <h2 className="pt-3">Transactions</h2>
      <CustomTable data={data} columns={COLUMNS(address)} />
    </div>
  );
};

export default TransactionTable;