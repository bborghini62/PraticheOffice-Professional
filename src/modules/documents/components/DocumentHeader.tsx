import { Box, Typography } from '@mui/material';
import { PrimaryButton, SecondaryButton } from '../../../design/components';

interface DocumentHeaderProps {
  title: string;
  subtitle: string;
  onEdit?: () => void;
  onMoreActions?: () => void;
}

export const DocumentHeader = ({ title, subtitle, onEdit, onMoreActions }: DocumentHeaderProps) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        {subtitle}
      </Typography>
    </Box>
    <Box sx={{ display: 'flex', gap: 1 }}>
      {onEdit && <SecondaryButton onClick={onEdit}>Modifica</SecondaryButton>}
      {onMoreActions && <PrimaryButton onClick={onMoreActions}>Azioni</PrimaryButton>}
    </Box>
  </Box>
);
