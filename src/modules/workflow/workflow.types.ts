import type { PracticeRecord, PracticeStatus } from '../practices/practices.types';

export type WorkflowRole = 'Administrator' | 'Supervisor' | 'Operator' | 'Collaborator' | 'Viewer';
export type WorkflowPermissionType = 'role' | 'status' | 'owner';

export interface WorkflowRule {
  id: string;
  type: WorkflowPermissionType;
  description: string;
  allowedRoles?: WorkflowRole[];
  requiredStatus?: PracticeStatus[];
}

export interface WorkflowStage {
  id: string;
  name: string;
  description: string;
  practiceStatus: PracticeStatus;
  color: string;
  isTerminal?: boolean;
}

export interface WorkflowTransition {
  id: string;
  fromStageId: string;
  toStageId: string;
  name: string;
  description: string;
  allowedRoles?: WorkflowRole[];
  rules?: string[];
}

export interface WorkflowDefinition {
  id: string;
  name: string;
  description: string;
  practiceType: string;
  initialStageId: string;
  stages: WorkflowStage[];
  transitions: WorkflowTransition[];
}

export interface WorkflowTransitionRecord {
  id: string;
  workflowId: string;
  practiceId: string;
  fromStageId: string;
  toStageId: string;
  transitionId: string;
  actor: string;
  note?: string;
  createdAt: string;
}

export interface WorkflowTransitionResult {
  success: boolean;
  message: string;
  practice?: PracticeRecord;
  transitionRecord?: WorkflowTransitionRecord;
}

export interface WorkflowSelectionState {
  workflowId: string;
  practiceId: string;
  transitionId: string;
  note: string;
}
