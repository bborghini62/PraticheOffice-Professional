import { Typography, type TypographyProps } from '@mui/material';

export const PageTitle = ({ sx, ...props }: TypographyProps) => (
  <Typography variant="h4" sx={{ fontWeight: 700, lineHeight: 1.2, ...sx }} {...props} />
);
