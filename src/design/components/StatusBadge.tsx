import { Chip, type ChipProps } from '@mui/material';

const statusColors: Record<string, { color: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'; label: string }> = {
  draft: { color: 'default', label: 'Bozza' },
  open: { color: 'primary', label: 'Aperta' },
  in_progress: { color: 'secondary', label: 'In lavorazione' },
  waiting: { color: 'warning', label: 'In attesa' },
  under_review: { color: 'warning', label: 'Da controllare' },
  approved: { color: 'success', label: 'Approvata' },
  completed: { color: 'success', label: 'Completata' },
  active: { color: 'success', label: 'Attivo' },
  inactive: { color: 'warning', label: 'Inattivo' },
  archived: { color: 'default', label: 'Archiviato' },
  cancelled: { color: 'error', label: 'Annullata' },
};

interface StatusBadgeProps extends Omit<ChipProps, 'label' | 'color'> {
  status: string;
}

export const StatusBadge = ({ status, sx, ...props }: StatusBadgeProps) => {
  const resolved = statusColors[status] ?? { color: 'default', label: status };

  return (
    <Chip
      label={resolved.label}
      color={resolved.color}
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
};
