import { Paper, type PaperProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const SectionCard = ({ sx, ...props }: PaperProps) => {
  const theme = useTheme();

  return <Paper elevation={0} sx={{ borderRadius: theme.shape.borderRadius, boxShadow: theme.shadows[2], p: 3, ...sx }} {...props} />;
};
