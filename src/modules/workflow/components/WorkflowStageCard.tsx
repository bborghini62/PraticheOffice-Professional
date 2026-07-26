import { Box, Chip, Typography } from '@mui/material';
import type { WorkflowStage } from '../workflow.types';

interface WorkflowStageCardProps {
  stage: WorkflowStage;
  isActive: boolean;
}

export const WorkflowStageCard = ({ stage, isActive }: WorkflowStageCardProps) => (
  <Box sx={{ border: '1px solid', borderColor: isActive ? 'primary.main' : 'divider', borderRadius: 2, p: 2, bgcolor: isActive ? 'primary.50' : 'background.paper' }}>
    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
      {stage.name}
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
      {stage.description}
    </Typography>
    <Chip size="small" label={stage.practiceStatus} sx={{ mt: 1.5 }} />
  </Box>
);
