import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, type TableProps } from '@mui/material';

interface DataTableProps extends TableProps {
  columns: string[];
  children: React.ReactNode;
}

export const DataTable = ({ columns, children, ...props }: DataTableProps) => (
  <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3 }}>
    <Table {...props}>
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell key={column}>{column}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>{children}</TableBody>
    </Table>
  </TableContainer>
);
