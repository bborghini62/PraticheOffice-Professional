import { Box, Stack, Typography } from '@mui/material';
import { PrimaryButton, SectionCard } from '../../../design/components';
import type { PracticeRecord } from '../../practices/practices.types';
import type { WorkflowDefinition, WorkflowSelectionState } from '../workflow.types';
import { WorkflowStageCard } from './WorkflowStageCard';

interface WorkflowDesignerProps {
  workflow: WorkflowDefinition;
  practice: PracticeRecord;
  selection: WorkflowSelectionState;
  onTransitionSelect: (transitionId: string) => void;
  onApply: () => void;
}

export const WorkflowDesigner = ({ workflow, practice, selection, onTransitionSelect, onApply }: WorkflowDesignerProps) => {
  const currentStageId = workflow.stages.find((stage) => stage.practiceStatus === practice.status)?.id;

  return (
    <SectionCard>
      <Stack spacing={2.5}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {workflow.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {workflow.description}
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gap: 1.5, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' } }}>
          {workflow.stages.map((stage) => (
            <WorkflowStageCard key={stage.id} stage={stage} isActive={stage.id === currentStageId} />
          ))}
        </Box>

        <Box sx={{ display: 'grid', gap: 1.5, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' } }}>
          {workflow.transitions.map((transition) => (
            <Box key={transition.id} sx={{ border: '1px solid', borderColor: selection.transitionId === transition.id ? 'primary.main' : 'divider', borderRadius: 2, p: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {transition.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {transition.description}
              </Typography>
              <PrimaryButton onClick={() => onTransitionSelect(transition.id)} sx={{ mt: 1.5 }}>
                Seleziona
              </PrimaryButton>
            </Box>
          ))}
        </Box>

        <PrimaryButton onClick={onApply} disabled={!selection.transitionId}>
          Applica transizione
        </PrimaryButton>
      </Stack>
    </SectionCard>
  );
};
