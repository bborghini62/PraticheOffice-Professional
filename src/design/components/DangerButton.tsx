import { Button, type ButtonProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const DangerButton = ({ sx, ...props }: ButtonProps) => {
  const theme = useTheme();

  return <Button color="error" variant="contained" sx={{ borderRadius: theme.shape.borderRadius, ...sx }} {...props} />;
};
