export type TimelineEventType =
  | 'practice_created'
  | 'practice_updated'
  | 'practice_status_changed'
  | 'practice_assignee_changed'
  | 'practice_group_changed'
  | 'practice_client_changed'
  | 'activity_created'
  | 'activity_completed'
  | 'activity_cancelled'
  | 'document_added'
  | 'document_version_added'
  | 'note_added';

export interface TimelineEventMetadata {
  [key: string]: string | number | boolean | undefined;
}

export interface TimelineEvent {
  id: string;
  practiceId: string;
  type: TimelineEventType;
  title: string;
  description: string;
  userName: string;
  createdAt: string;
  metadata?: TimelineEventMetadata;
}
