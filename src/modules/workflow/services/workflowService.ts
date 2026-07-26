import { addEvent, createTimelineEvent } from '../../timeline/services/timelineService';
import type { PracticeRecord } from '../../practices/practices.types';
import { getPracticeById, updatePractice } from '../../practices/services/practicesService';
import type { WorkflowDefinition, WorkflowTransitionRecord } from '../workflow.types';

const workflowDefinitions: WorkflowDefinition[] = [
  {
    id: 'workflow-standard',
    name: 'Workflow standard',
    description: 'Gestione operativa delle pratiche standard.',
    practiceType: 'standard',
    initialStageId: 'stage-open',
    stages: [
      { id: 'stage-open', name: 'Aperta', description: 'Pratica avviata', practiceStatus: 'open', color: '#1976d2' },
      { id: 'stage-progress', name: 'In corso', description: 'Pratica in lavorazione', practiceStatus: 'in_progress', color: '#ed6c02' },
      { id: 'stage-review', name: 'In revisione', description: 'Pratica da approvare', practiceStatus: 'under_review', color: '#9c27b0' },
      { id: 'stage-approved', name: 'Approvata', description: 'Pratica approvata', practiceStatus: 'approved', color: '#2e7d32' },
      { id: 'stage-completed', name: 'Completata', description: 'Pratica chiusa', practiceStatus: 'completed', color: '#4caf50', isTerminal: true },
    ],
    transitions: [
      { id: 'tr-open-progress', fromStageId: 'stage-open', toStageId: 'stage-progress', name: 'Avanza', description: 'Porta la pratica in lavorazione', allowedRoles: ['Administrator', 'Supervisor', 'Operator'] },
      { id: 'tr-progress-review', fromStageId: 'stage-progress', toStageId: 'stage-review', name: 'Richiedi revisione', description: 'Manda la pratica in revisione', allowedRoles: ['Administrator', 'Supervisor'] },
      { id: 'tr-review-approved', fromStageId: 'stage-review', toStageId: 'stage-approved', name: 'Approva', description: 'Approva la pratica', allowedRoles: ['Administrator', 'Supervisor'] },
      { id: 'tr-approved-completed', fromStageId: 'stage-approved', toStageId: 'stage-completed', name: 'Completa', description: 'Chiude la pratica', allowedRoles: ['Administrator', 'Supervisor'] },
    ],
  },
];

const transitionHistory: WorkflowTransitionRecord[] = [];

export const getWorkflowDefinitions = (): WorkflowDefinition[] => workflowDefinitions.map((definition) => ({
  ...definition,
  stages: definition.stages.map((stage) => ({ ...stage })),
  transitions: definition.transitions.map((transition) => ({ ...transition })),
}));

export const getWorkflowDefinitionById = (workflowId: string): WorkflowDefinition | undefined => getWorkflowDefinitions().find((definition) => definition.id === workflowId);

export const getWorkflowHistoryByPracticeId = (practiceId: string): WorkflowTransitionRecord[] => transitionHistory.filter((entry) => entry.practiceId === practiceId);

export const createWorkflowTransitionRecord = (workflowId: string, practiceId: string, transitionId: string, fromStageId: string, toStageId: string, actor: string, note?: string): WorkflowTransitionRecord => {
  const record: WorkflowTransitionRecord = {
    id: `WFH-${String(transitionHistory.length + 1).padStart(3, '0')}`,
    workflowId,
    practiceId,
    transitionId,
    fromStageId,
    toStageId,
    actor,
    note,
    createdAt: new Date().toISOString(),
  };

  transitionHistory.push(record);
  return record;
};

export const getWorkflowForPracticeType = (practiceType: string): WorkflowDefinition | undefined => getWorkflowDefinitions().find((definition) => definition.practiceType === practiceType);

export const getPracticeWorkflow = (practice: PracticeRecord): WorkflowDefinition | undefined => {
  const practiceType = practice.id.includes('PRC') ? 'standard' : 'standard';
  return getWorkflowForPracticeType(practiceType);
};

export const getWorkflowStageForPractice = (practice: PracticeRecord): string | undefined => {
  const workflow = getPracticeWorkflow(practice);
  if (!workflow) {
    return undefined;
  }

  const stage = workflow.stages.find((entry) => entry.practiceStatus === practice.status);
  return stage?.id;
};

export const applyWorkflowTransition = (workflowId: string, practiceId: string, transitionId: string, actor: string, note?: string): WorkflowTransitionRecord | undefined => {
  const workflow = getWorkflowDefinitionById(workflowId);
  const practice = getPracticeById(practiceId);

  if (!workflow || !practice) {
    return undefined;
  }

  const transition = workflow.transitions.find((entry) => entry.id === transitionId);
  if (!transition) {
    return undefined;
  }

  const fromStage = workflow.stages.find((stage) => stage.id === transition.fromStageId);
  const toStage = workflow.stages.find((stage) => stage.id === transition.toStageId);
  if (!fromStage || !toStage) {
    return undefined;
  }

  const nextPractice: PracticeRecord = {
    ...practice,
    status: toStage.practiceStatus,
    updatedAt: new Date().toISOString(),
  };

  updatePractice(nextPractice);

  addEvent(
    createTimelineEvent(
      practice.id,
      'practice_status_changed',
      `Stato aggiornato: ${toStage.name}`,
      note ?? `La pratica è stata spostata da ${fromStage.name} a ${toStage.name}.`,
      actor,
      new Date().toISOString(),
    ),
  );

  const record = createWorkflowTransitionRecord(workflow.id, practice.id, transition.id, fromStage.id, toStage.id, actor, note);
  return record;
};
