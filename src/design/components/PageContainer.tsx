import { Box, type BoxProps } from '@mui/material';

export const PageContainer = (props: BoxProps) => <Box sx={{ display: 'grid', gap: 3, width: '100%' }} {...props} />;
