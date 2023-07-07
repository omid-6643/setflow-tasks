"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import Typography from "@mui/material/Typography";

import { useModel } from "@/hooks/useModel";
import { Model } from "@/types/models";

import { useFilterContext } from "../context/filter";

const columnHelper = createColumnHelper<Model | undefined>();

const columns = [
  columnHelper.accessor("modelName", {
    cell: (props) => (
      <Typography sx={{ fontWeight: "bold" }}>
        {props?.row?.original?.modelName}
      </Typography>
    ),
    header: () => <span>Set Name</span>,
  }),
  columnHelper.accessor("category", {
    cell: (info) => info.getValue(),
    header: () => <span>Category</span>,
  }),
  columnHelper.accessor("address", {
    cell: (info) => info.getValue(),
    header: () => <span>Address</span>,
  }),
  columnHelper.accessor("nextDate", {
    cell: (props) => (
      <span>
        {`${new Date(props?.row?.original?.nextDate).toDateString()}`}
      </span>
    ),
    header: () => <span>Next Availability</span>,
  }),
  columnHelper.accessor(" ", {
    cell: (props) => (
      <span>
        <ArrowCircleRightOutlinedIcon fontSize="large" />
      </span>
    ),
    header: () => <span></span>,
  }),
];

const MainTable = () => {
  const { filteredModel: models } = useFilterContext();

  console.log("models", models);

  const { data, isLoading, isError, error } = useModel();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          {table?.getHeaderGroups()?.map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup?.headers?.map((header) => (
                <TableCell key={header.id}>
                  {header?.isPlaceholder
                    ? null
                    : flexRender(
                        header?.column?.columnDef?.header,
                        header?.getContext()
                      )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>

        <TableBody>
          {table?.getRowModel()?.rows?.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {row?.getVisibleCells()?.map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(
                    cell?.column?.columnDef?.cell,
                    cell?.getContext()
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MainTable;
