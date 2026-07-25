import { Chip, type ChipProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const statusColors: Record<string, { color: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'; label: string }> = {
  draft: { color: 'default', label: 'Bozza' },
  open: { color: 'primary', label: 'Aperta' },
  in_progress: { color: 'secondary', label: 'In lavorazione' },
  waiting: { color: 'warning', label: 'In attesa' },
  under_review: { color: 'warning', label: 'Da controllare' },
  approved: { color: 'success', label: 'Approvata' },
  completed: { color: 'success', label: 'Completata' },
  archived: { color: 'default', label: 'Archiviata' },
  cancelled: { color: 'error', label: 'Annullata' },
};

interface StatusBadgeProps extends Omit<ChipProps, 'label' | 'color'> {
  status: string;
}

export const StatusBadge = ({ status, sx, ...props }: StatusBadgeProps) => {
  const theme = useTheme();
  const resolved = statusColors[status] ?? { color: 'default', label: status };

  return <Chip label={resolved.label} color={resolved.color} size="small" sx={{ borderRadius: theme.shape.borderRadius, fontWeight: 600, ...sx }} {...props} />;
};
