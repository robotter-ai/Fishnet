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
import { TiArrowUnsorted } from 'react-icons/ti';
import { TbMoodSad } from 'react-icons/tb';
import classNames from 'classnames';

export interface ITableColumns {
  header: string | React.ReactNode;
  accessor?: string;
  cell: (value: any) => React.ReactNode;
  isSortable?: boolean;
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
  return (
    <div>
      {isLoading ? <BarLoader color="#0054FF" width="100%" /> : null}
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((item, i) => (
                <TableCell key={i}>
                  <div
                    className={classNames(
                      'flex gap-2 items-center whitespace-nowrap',
                      {
                        'justify-end': item.header === 'Filter',
                      }
                    )}
                  >
                    {item.header}
                    {item.isSortable ? (
                      <TiArrowUnsorted color="rgba(28, 28, 28, 0.6)" />
                    ) : null}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item, idx) => (
              <TableRow
                key={idx}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {columns.map((column, i) => (
                  <TableCell key={i}>{column.cell(item)}</TableCell>
                ))}
              </TableRow>
            ))}
            {!data?.length && isLoading ? (
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
            {!data?.length && !isLoading ? (
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
