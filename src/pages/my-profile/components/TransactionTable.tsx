import { ArrowDownIcon, ArrowUpIcon } from '@assets/icons';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import dayjs from 'dayjs';

const COLUMNS = (address): ITableColumns[] => [
  {
    header: 'DATA NAME',
    cell: (item) => (
      <span className="text-primary">{item.info.params.name}</span>
    ),
    sortWith: 'typ',
  },
  {
    header: 'TYP',
    cell: (item) => (
      <span className="flex gap-2 items-center">
        {item.signer === address ? (
          <>
            <ArrowDownIcon /> Incoming
          </>
        ) : (
          <>
            <ArrowUpIcon /> Outgoing
          </>
        )}
      </span>
    ),
    sortWith: 'typ',
  },
  {
    header: 'DATE',
    cell: (item) => dayjs(item.timestamp).format('DD.MM.YYYY'),
    sortWith: 'typ',
  },
  {
    header: 'Price',
    cell: (item) => `${item.info.params.amount} USDC`,
    sortWith: 'typ',
  },
];

const TransactionTable = ({ data, address }) => {
  return (
    <div>
      <h2 className="pt-3">Transactions</h2>
      <CustomTable data={data} columns={COLUMNS(address)} />
    </div>
  );
};

export default TransactionTable;
