import { Paper, type PaperProps } from '@mui/material';

export const SectionCard = ({ sx, ...props }: PaperProps) => (
  <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', p: { xs: 2, md: 3 }, boxShadow: 'none', ...sx }} {...props} />
);
