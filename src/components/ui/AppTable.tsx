import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { RiFilter2Line } from "react-icons/ri";
import { TiArrowUnsorted } from "react-icons/ti";
import { FaStar, FaRegStar } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Button from "./Button";

const rows = [
  {
    name: "Data <Name>",
    hash: "8743b52063cd8409g885774ehfbfd...",
    dataRequest: "",
    date: "2020-11-05 7:45:32",
  },
  {
    name: "Data <Name>",
    hash: "8743b52063cd8409g885774ehfbfd...",
    dataRequest: "",
    date: "2020-11-05 7:45:32",
  },
  {
    name: "Data <Name>",
    hash: "8743b52063cd8409g885774ehfbfd...",
    dataRequest: "",
    date: "2020-11-05 7:45:32",
  },
  {
    name: "Data <Name>",
    hash: "8743b52063cd8409g885774ehfbfd...",
    dataRequest: "",
    date: "2020-11-05 7:45:32",
  },
  {
    name: "Data <Name>",
    hash: "8743b52063cd8409g885774ehfbfd...",
    dataRequest: "",
    date: "2020-11-05 7:45:32",
  },
  {
    name: "Data <Name>",
    hash: "8743b52063cd8409g885774ehfbfd...",
    dataRequest: "",
    date: "2020-11-05 7:45:32",
  },
  {
    name: "Data <Name>",
    hash: "8743b52063cd8409g885774ehfbfd...",
    dataRequest: "",
    date: "2020-11-05 7:45:32",
  },
];

const AppTable = ({ handleOpen }: { handleOpen: () => void }) => {
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
              <div className="flex gap-2 items-center">
                Data Request <TiArrowUnsorted color="rgba(28, 28, 28, 0.6)" />
              </div>
            </TableCell>
            <TableCell>
              <div className="flex gap-2 items-center">
                Date <TiArrowUnsorted color="rgba(28, 28, 28, 0.6)" />
              </div>
            </TableCell>
            <TableCell></TableCell>
            <TableCell>
              <div className="flex gap-2 items-center justify-end">
                <RiFilter2Line /> Filter
              </div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.hash}</TableCell>
              <TableCell>{row.dataRequest}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>
                <div className="flex gap-3">
                  <FaRegStar size={24} color="#172025" />
                  <div className="cursor-pointer" onClick={handleOpen}>
                    <MdDeleteOutline size={24} color="#172025" />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-3 justify-end">
                  <Button text="Edit" btnStyle="outline-blue" />
                  <Button text="Share" btnStyle="outline-blue" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AppTable;
