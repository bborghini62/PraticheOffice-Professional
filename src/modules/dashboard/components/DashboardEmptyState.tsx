import { Box } from '@mui/material';
import { EmptyState } from '../../../design/components';

interface DashboardEmptyStateProps {
  title: string;
  description: string;
}

export const DashboardEmptyState = ({ title, description }: DashboardEmptyStateProps) => (
  <Box sx={{ border: '1px dashed', borderColor: 'divider', borderRadius: 2, p: 3 }}>
    <EmptyState title={title} description={description} />
  </Box>
);
