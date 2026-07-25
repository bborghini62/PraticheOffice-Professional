import { Box, Button, Typography, type BoxProps } from '@mui/material';

interface EmptyStateProps extends BoxProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void | Promise<void>;
}

export const EmptyState = ({ title, description, actionLabel, onAction, children, ...props }: EmptyStateProps) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', py: 6 }} {...props}>
    <Typography variant="h6" sx={{ mb: 1 }}>
      {title}
    </Typography>
    {description ? (
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {description}
      </Typography>
    ) : null}
    {actionLabel && onAction ? (
      <Button variant="contained" onClick={() => onAction()} sx={{ mt: 1 }}>
        {actionLabel}
      </Button>
    ) : null}
    {children}
  </Box>
);
