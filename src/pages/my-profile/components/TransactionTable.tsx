import CustomTable, { ITableColumns } from '@components/ui/CustomTable';

const COLUMNS: ITableColumns[] = [
  {
    header: 'DATA NAME',
    cell: (item) => '',
    sortWith: 'typ',
  },
  {
    header: 'TYP',
    cell: (item) => '',
    sortWith: 'typ',
  },
  {
    header: 'DATE',
    cell: (item) => '',
    sortWith: 'typ',
  },
  {
    header: 'Price',
    cell: (item) => '',
    sortWith: 'typ',
  },
];

const TransactionTable = () => {
  return <CustomTable data={[]} columns={COLUMNS} />;
};

export default TransactionTable;
