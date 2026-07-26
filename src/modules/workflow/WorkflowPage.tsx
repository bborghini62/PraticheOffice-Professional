import { Box, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer, PageTitle, SectionCard } from '../../design/components';
import { getPracticeById } from '../practices/services/practicesService';
import { WorkflowDesigner } from './components/WorkflowDesigner';
import { WorkflowHistory } from './components/WorkflowHistory';
import { WorkflowTransitionDialog } from './components/WorkflowTransitionDialog';
import { createWorkflowSelectionState, executeWorkflowTransition } from './services/workflowEngine';
import { getWorkflowDefinitionById, getWorkflowHistoryByPracticeId } from './services/workflowService';
import type { WorkflowSelectionState } from './workflow.types';

const WorkflowPage = () => {
  const { practiceId } = useParams();
  const practice = practiceId ? getPracticeById(practiceId) : undefined;
  const workflow = useMemo(() => (practice ? getWorkflowDefinitionById('workflow-standard') : undefined), [practice]);
  const [selection, setSelection] = useState<WorkflowSelectionState | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!practice || !workflow) {
    return (
      <PageContainer>
        <PageTitle subtitle="Dettaglio workflow non disponibile.">Workflow</PageTitle>
        <SectionCard>
          <Typography variant="body2" color="text.secondary">
            Seleziona una pratica per vedere il workflow associato.
          </Typography>
        </SectionCard>
      </PageContainer>
    );
  }

  const state = selection ?? createWorkflowSelectionState(practice.id, workflow.id);

  const handleTransitionSelect = (transitionId: string) => {
    setSelection({ ...state, transitionId });
    setDialogOpen(true);
  };

  const handleApplyTransition = (transitionId: string, note: string) => {
    const nextState = { ...state, transitionId, note };
    setSelection(nextState);
    executeWorkflowTransition(nextState, 'Sistema');
  };

  return (
    <PageContainer>
      <Box>
        <PageTitle subtitle="Gestione del ciclo di vita delle pratiche tramite workflow configurabile.">Workflow</PageTitle>
      </Box>

      <Stack spacing={2.5}>
        <SectionCard>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Pratica {practice.code}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {practice.subject}
          </Typography>
        </SectionCard>

        <WorkflowDesigner workflow={workflow} practice={practice} selection={state} onTransitionSelect={handleTransitionSelect} onApply={() => setDialogOpen(true)} />
        <WorkflowHistory history={getWorkflowHistoryByPracticeId(practice.id)} />
      </Stack>

      <WorkflowTransitionDialog
        workflow={workflow}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleApplyTransition}
      />
    </PageContainer>
  );
};

export default WorkflowPage;
