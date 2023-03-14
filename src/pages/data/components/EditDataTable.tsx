import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { TiArrowUnsorted } from 'react-icons/ti';
import { MdDeleteOutline } from 'react-icons/md';
import { ReactComponent as EditIcon } from '@assets/icons/edit-pencil.svg';
import { CheckBox } from '@components/form';
import { LineChart, Line } from 'recharts';

const rows = [
  {
    indicator: 'returnsBTC',
    chart: '',
    values: '0.5 — 7',
  },
  {
    indicator: 'returnsBTC',
    chart: '',
    values: '0.5 — 7',
  },
  {
    indicator: 'returnsBTC',
    chart: '',
    values: '0.5 — 7',
  },
  {
    indicator: 'returnsBTC',
    chart: '',
    values: '0.5 — 7',
  },
  {
    indicator: 'returnsBTC',
    chart: '',
    values: '0.5 — 7',
  },
  {
    indicator: 'returnsBTC',
    chart: '',
    values: '0.5 — 7',
  },
];

const data = [
  {
    name: 'Page A',
    uv: 40,
  },
  {
    name: 'Page B',
    uv: 3000,
  },
  {
    name: 'Page C',
    uv: 2000,
  },
];

const EditDataTable = ({ isPublished }: { isPublished: any }) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <div className="flex gap-2 items-center">
                Indicator <TiArrowUnsorted color="rgba(28, 28, 28, 0.6)" />
              </div>
            </TableCell>
            <TableCell>
              <div className="flex gap-2 items-center">Chart</div>
            </TableCell>
            <TableCell>
              <div className="flex gap-2 items-center">
                Values <TiArrowUnsorted color="rgba(28, 28, 28, 0.6)" />
              </div>
            </TableCell>
            <TableCell>
              <div className="flex gap-2 items-center">
                Time interval <TiArrowUnsorted color="rgba(28, 28, 28, 0.6)" />
              </div>
            </TableCell>
            <TableCell>
              {isPublished ? <span>&#8203;</span> : 'Check to upload'}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                <div className="flex gap-2">
                  {row.indicator}
                  <EditIcon color="#0054ff" />
                </div>
              </TableCell>
              <TableCell>
                <LineChart width={50} height={10} data={data}>
                  <Line type="monotone" dataKey="uv" stroke="#0054ff" />
                </LineChart>
              </TableCell>
              <TableCell>{row.values}</TableCell>
              <TableCell>Month</TableCell>
              <TableCell>
                {isPublished ? (
                  <div className="cursor-pointer">
                    <MdDeleteOutline size={24} color="#172025" />
                  </div>
                ) : (
                  <CheckBox />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EditDataTable;
