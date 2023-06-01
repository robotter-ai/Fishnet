import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { BarLoader } from 'react-spinners';
import { GrCloudDownload } from 'react-icons/gr';
import { TbMoodSad } from 'react-icons/tb';
import classNames from 'classnames';
import { FilterIcon, SortArrowIcon } from '@assets/icons';

export interface ITableColumns {
  header: string | React.ReactNode;
  accessor?: string;
  cell: (value: any) => React.ReactNode;
  sortWith?: any;
}

interface CustomTableProps {
  data: Record<string, any>[];
  columns: ITableColumns[];
  isLoading?: boolean;
}

const CustomTable: React.FC<CustomTableProps> = ({
  data,
  isLoading,
  columns,
}) => {
  const [sortData, setSetSortData] = useState(data || []);
  const [order, setOrder] = useState(true);

  useEffect(() => {
    setSetSortData(data);
  }, [data]);

  const handleSortData = (key: string | number) => {
    if (!sortData?.length) return;

    setSetSortData((prevState) => {
      const sortedData = [...prevState].sort((a, b) => {
        const x = JSON.stringify(a[key]).toLowerCase();
        const y = JSON.stringify(b[key]).toLowerCase();

        if (order) {
          if (x < y) return -1;
          if (x > y) return 1;
        }

        if (x < y) return 1;
        if (x > y) return -1;

        return 0;
      });

      return sortedData;
    });

    setOrder(!order);
  };

  return (
    <div>
      {isLoading ? <BarLoader color="#0054FF" width="100%" /> : null}
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((item, i) => (
                <TableCell
                  key={i}
                  style={{
                    padding: 0,
                    paddingRight: columns.length - 1 === i ? 0 : 15,
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}
                >
                  <div
                    className={classNames(
                      'flex gap-2 items-center whitespace-nowrap',
                      {
                        'justify-end': item.header === 'Filter',
                      }
                    )}
                  >
                    {item.header === 'Filter' ? <FilterIcon /> : null}{' '}
                    {item.header}
                    {item.sortWith ? (
                      <SortArrowIcon
                        className="cursor-pointer"
                        width={9}
                        height={10}
                        onClick={() => handleSortData(item.sortWith)}
                      />
                    ) : null}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortData?.map((item, idx) => (
              <TableRow
                key={idx}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {columns.map((column, i) => (
                  <TableCell
                    key={i}
                    style={{
                      padding: 0,
                      paddingRight: columns.length - 1 === i ? 0 : 15,
                      paddingTop: 12,
                      paddingBottom: 12,
                    }}
                  >
                    {column.cell(item)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {!sortData?.length && isLoading ? (
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell colSpan={columns.length}>
                  <div className="flex flex-col gap-3 items-center py-5">
                    <GrCloudDownload size={60} color="#676767" />
                    <p>Fetching data...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : null}
            {!sortData?.length && !isLoading ? (
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell colSpan={columns.length}>
                  <div className="flex flex-col gap-3 items-center py-5">
                    <TbMoodSad size={60} color="#676767" />
                    <p>No data found!</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CustomTable;
