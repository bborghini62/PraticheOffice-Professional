import type { PracticeRecord } from '../../practices/practices.types';
import type { WorkflowDefinition, WorkflowTransitionResult, WorkflowSelectionState } from '../workflow.types';
import { applyWorkflowTransition, getWorkflowDefinitionById, getWorkflowHistoryByPracticeId } from './workflowService';

export const createWorkflowSelectionState = (practiceId: string, workflowId: string): WorkflowSelectionState => ({
  workflowId,
  practiceId,
  transitionId: '',
  note: '',
});

export const executeWorkflowTransition = (state: WorkflowSelectionState, actor: string): WorkflowTransitionResult => {
  const workflow = getWorkflowDefinitionById(state.workflowId);
  if (!workflow) {
    return { success: false, message: 'Workflow non trovato.' };
  }

  const transitionRecord = applyWorkflowTransition(state.workflowId, state.practiceId, state.transitionId, actor, state.note);
  if (!transitionRecord) {
    return { success: false, message: 'Transizione non disponibile.' };
  }

  return {
    success: true,
    message: 'Transizione applicata correttamente.',
    transitionRecord,
  };
};

export const getWorkflowEngineSummary = (workflow: WorkflowDefinition, practice: PracticeRecord) => ({
  workflow,
  history: getWorkflowHistoryByPracticeId(practice.id),
  currentStageId: workflow.stages.find((stage) => stage.practiceStatus === practice.status)?.id,
});
