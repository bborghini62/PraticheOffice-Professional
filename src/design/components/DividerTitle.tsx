import { Box, Divider, Typography, type BoxProps } from '@mui/material';

interface DividerTitleProps extends BoxProps {
  title: string;
}

export const DividerTitle = ({ title, ...props }: DividerTitleProps) => (
  <Box {...props}>
    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
      {title}
    </Typography>
    <Divider />
  </Box>
);
