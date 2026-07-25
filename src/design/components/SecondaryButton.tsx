import { Button, type ButtonProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const SecondaryButton = ({ sx, ...props }: ButtonProps) => {
  const theme = useTheme();

  return <Button variant="outlined" sx={{ borderRadius: theme.shape.borderRadius, ...sx }} {...props} />;
};
