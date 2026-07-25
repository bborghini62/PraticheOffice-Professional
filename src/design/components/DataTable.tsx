import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, type TableProps } from '@mui/material';

interface DataTableProps extends TableProps {
  columns: Array<string | { id: string; label: string }>;
  children: React.ReactNode;
}

export const DataTable = ({ columns, children, ...props }: DataTableProps) => (
  <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
    <Table size="small" {...props}>
      <TableHead sx={{ bgcolor: 'grey.50' }}>
        <TableRow>
          {columns.map((column) => {
            const label = typeof column === 'string' ? column : column.label;
            const key = typeof column === 'string' ? column : column.id;

            return (
              <TableCell key={key} sx={{ py: 1.25 }}>
                {label}
              </TableCell>
            );
          })}
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
