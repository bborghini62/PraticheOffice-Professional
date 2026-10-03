import { Chip, type ChipProps } from '@mui/material';
import { getStatusLabel, getStatusTone } from './statusLabels';

interface StatusBadgeProps extends Omit<ChipProps, 'label' | 'color'> {
  status: string;
}

export const StatusBadge = ({ status, sx, ...props }: StatusBadgeProps) => (
  <Chip
    label={getStatusLabel(status)}
    color={getStatusTone(status)}
    size="small"
    variant="filled"
    sx={{
      borderRadius: 999,
      fontWeight: 700,
      height: 28,
      px: 0.5,
      '& .MuiChip-label': {
        px: 1.25,
        fontSize: '0.75rem',
      },
      ...sx,
    }}
    {...props}
  />
);
