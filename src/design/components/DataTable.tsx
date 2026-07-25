import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, type TableProps } from '@mui/material';

interface DataTableProps extends TableProps {
  columns: string[];
  children: React.ReactNode;
}

export const DataTable = ({ columns, children, ...props }: DataTableProps) => (
  <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
    <Table size="small" {...props}>
      <TableHead sx={{ bgcolor: 'grey.50' }}>
        <TableRow>
          {columns.map((column) => (
            <TableCell key={column} sx={{ py: 1.25 }}>{column}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody
        sx={{
          '& tr': {
            transition: 'background-color 0.2s ease',
            '&:hover': {
              bgcolor: 'grey.50',
            },
          },
          '& td': {
            borderBottom: '1px solid',
            borderColor: 'divider',
            py: 1.4,
          },
        }}
      >
        {children}
      </TableBody>
    </Table>
  </TableContainer>
);
