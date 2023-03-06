import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { RiFilter2Line } from 'react-icons/ri';
import { TiArrowUnsorted } from 'react-icons/ti';
import Button from '@components/ui/Button';
import ClickToCopy from '@components/ui/ClickToCopy';
import { StatusIdentifier } from '@shared/constant';

const rows = [
  {
    starred: true,
    hash: '8743b52063cd8409g885774...',
    access: 59,
    result: <StatusIdentifier status="Successful" />,
    date: '2020-11-05 7:45:32',
  },
  {
    starred: true,
    hash: '8743b52063cd8409g885774...',
    access: 59,
    result: <StatusIdentifier status="Pending" />,
    date: '2020-11-05 7:45:32',
  },
  {
    starred: true,
    hash: '8743b52063cd8409g885774...',
    access: 992,
    result: <StatusIdentifier status="Requested" />,
    date: '2020-11-05 7:45:32',
  },
  {
    starred: false,
    hash: '8743b52063cd8409g885774...',
    access: 59,
    result: <StatusIdentifier status="Running" />,
    date: '2020-11-05 7:45:32',
  },
  {
    starred: true,
    hash: '8743b52063cd8409g885774...',
    access: 24,
    result: <StatusIdentifier status="Faild" />,
    date: '2020-11-05 7:45:32',
  },
  {
    starred: true,
    hash: '8743b52063cd8409g885774...',
    access: 4755,
    result: <StatusIdentifier status="Requested" />,
    date: '2020-11-05 7:45:32',
  },
  {
    starred: false,
    hash: '8743b52063cd8409g885774...',
    access: 59,
    result: <StatusIdentifier status="Requested" />,
    date: '2020-11-05 7:45:32',
  },
];

const ExecutionHistoryTable = () => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <div className="flex gap-2 items-center whitespace-nowrap">
                Execution Date <TiArrowUnsorted color="rgba(28, 28, 28, 0.6)" />
              </div>
            </TableCell>
            <TableCell>
              <div className="flex gap-2 items-center">
                Hash of data <TiArrowUnsorted color="rgba(28, 28, 28, 0.6)" />
              </div>
            </TableCell>
            <TableCell>
              <div className="flex gap-2 items-center whitespace-nowrap">
                Hash of algorithm
                <TiArrowUnsorted color="rgba(28, 28, 28, 0.6)" />
              </div>
            </TableCell>
            <TableCell>
              <div className="flex gap-2 items-center whitespace-nowrap">
                Result
                <TiArrowUnsorted color="rgba(28, 28, 28, 0.6)" />
              </div>
            </TableCell>
            <TableCell>
              <div className="flex gap-2 items-center justify-end">
                <RiFilter2Line /> Filter
              </div>
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
                <p className="whitespace-nowrap">{row.date}</p>
              </TableCell>
              <TableCell>
                <div className="flex gap-3">
                  <p className="text-blue whitespace-nowrap">{row.hash}</p>
                  <ClickToCopy text={row.hash} />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-3">
                  <p className="text-blue whitespace-nowrap">{row.hash}</p>
                  <ClickToCopy text={row.hash} />
                </div>
              </TableCell>
              <TableCell>{row.result}</TableCell>
              <TableCell>
                <div className="flex gap-3 justify-end">
                  <Button text="Result" btnStyle="outline-blue" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExecutionHistoryTable;
