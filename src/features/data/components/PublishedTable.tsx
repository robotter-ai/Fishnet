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
import { AiOutlineDelete } from 'react-icons/ai';
import { IoCopyOutline } from 'react-icons/io5';
import Button from '@components/ui/Button';
import { ToggleButton, Starred } from '@components/form';

const rows = [
  {
    name: 'Data <Name>',
    starred: true,
    hash: '8743b52063cd8409g885774...',
    dataRequest: <ToggleButton />,
    date: '2020-11-05 7:45:32',
  },
  {
    name: 'Data <Name>',
    starred: true,
    hash: '8743b52063cd8409g885774...',
    dataRequest: <ToggleButton />,
    date: '2020-11-05 7:45:32',
  },
  {
    name: 'Data <Name>',
    starred: false,
    hash: '8743b52063cd8409g885774...',
    dataRequest: <ToggleButton />,
    date: '2020-11-05 7:45:32',
  },
  {
    name: 'Data <Name>',
    starred: true,
    hash: '8743b52063cd8409g885774...',
    dataRequest: <ToggleButton />,
    date: '2020-11-05 7:45:32',
  },
  {
    name: 'Data <Name>',
    starred: false,
    hash: '8743b52063cd8409g885774...',
    dataRequest: <ToggleButton />,
    date: '2020-11-05 7:45:32',
  },
  {
    name: 'Data <Name>',
    starred: false,
    hash: '8743b52063cd8409g885774...',
    dataRequest: <ToggleButton />,
    date: '2020-11-05 7:45:32',
  },
  {
    name: 'Data <Name>',
    starred: true,
    hash: '8743b52063cd8409g885774...',
    dataRequest: <ToggleButton />,
    date: '2020-11-05 7:45:32',
  },
];

const PublishedTable = ({ handleOpen }: { handleOpen: () => void }) => {
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
                Hash <TiArrowUnsorted color="rgba(28, 28, 28, 0.6)" />
              </div>
            </TableCell>
            <TableCell>
              <div className="flex gap-2 items-center whitespace-nowrap">
                Public access <TiArrowUnsorted color="rgba(28, 28, 28, 0.6)" />
              </div>
            </TableCell>
            <TableCell>
              <div className="flex gap-2 items-center">
                Description <TiArrowUnsorted color="rgba(28, 28, 28, 0.6)" />
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
                <p className="text-blue whitespace-nowrap">{row.name}</p>
              </TableCell>
              <TableCell>
                <div className="flex gap-3">
                  {row.hash} <IoCopyOutline size={20} />
                </div>
              </TableCell>
              <TableCell>
                <div className="text-center">{row.dataRequest}</div>
              </TableCell>
              <TableCell>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore.
                </p>
              </TableCell>
              <TableCell>
                <div className="flex gap-3">
                  <Starred starred={row.starred} />
                  <div
                    role="button"
                    className="cursor-pointer"
                    onClick={handleOpen}
                  >
                    <AiOutlineDelete size={24} color="#29324A" />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Button text="Use" btnStyle="outline-blue" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PublishedTable;
