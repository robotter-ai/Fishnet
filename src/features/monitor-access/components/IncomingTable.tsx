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
import { BsDot } from 'react-icons/bs';
import { STATUS_COLOR } from '@shared/constant';
import { Starred } from '@components/form';
import ClickToCopy from '@components/ui/ClickToCopy';
import { Link } from 'react-router-dom';

const rows = [
  {
    name: 'Data <Name>',
    starred: false,
    requestFrom: 'Account <Name>',
    hash: '8743b52063cd8409g885774...',
    status: 'Allowed',
  },
  {
    name: 'Data <Name>',
    starred: false,
    requestFrom: 'Account <Name>',
    hash: '8743b52063cd8409g885774...',
    status: 'Waiting',
  },
  {
    name: 'Data <Name>',
    starred: false,
    requestFrom: 'Account <Name>',
    hash: '8743b52063cd8409g885774...',
    status: 'Waiting',
  },
  {
    name: 'Data <Name>',
    starred: false,
    requestFrom: 'Account <Name>',
    hash: '8743b52063cd8409g885774...',
    status: 'Allowed',
  },
];

const IncomingTable = () => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <div className="flex gap-2 items-center">
                Name <TiArrowUnsorted color="rgba(28, 28, 28, 0.6)" />
              </div>
            </TableCell>
            <TableCell>
              <div className="flex gap-2 items-center">
                Hash of data <TiArrowUnsorted color="rgba(28, 28, 28, 0.6)" />
              </div>
            </TableCell>
            <TableCell>
              <div className="flex gap-2 items-center whitespace-nowrap">
                Status <TiArrowUnsorted color="rgba(28, 28, 28, 0.6)" />
              </div>
            </TableCell>
            <TableCell>
              <div className="flex gap-2 items-center">
                Request from <TiArrowUnsorted color="rgba(28, 28, 28, 0.6)" />
              </div>
            </TableCell>
            <TableCell />
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
                <Link
                  to={`/data/${'dataset-id'}/details`}
                  className="text-blue whitespace-nowrap"
                >
                  {row.name}
                </Link>
              </TableCell>
              <TableCell>
                <div className="flex gap-3">
                  {row.hash} <ClickToCopy text={row.hash} />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center whitespace-nowrap text-center">
                  <p>{row.status}</p>
                  <BsDot size={45} color={STATUS_COLOR?.[row.status]} />
                </div>
              </TableCell>
              <TableCell>
                <p className="text-blue whitespace-nowrap">{row.requestFrom}</p>
              </TableCell>
              <TableCell>
                <Starred starred={row.starred} />
              </TableCell>
              <TableCell>
                <div className="flex gap-2 justify-end">
                  {row.status === 'Allowed' ? (
                    <Button text="Settings" btnStyle="outline-blue" />
                  ) : (
                    <Button text="Allow" btnStyle="outline-blue" />
                  )}
                  <Button text="Refuse" btnStyle="outline-red" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default IncomingTable;
