import { Box, Typography, type BoxProps } from '@mui/material';

interface FormSectionProps extends BoxProps {
  title: string;
}

export const FormSection = ({ title, children, ...props }: FormSectionProps) => (
  <Box component="section" sx={{ display: 'grid', gap: 2 }} {...props}>
    <Typography variant="h6">{title}</Typography>
    {children}
  </Box>
);
