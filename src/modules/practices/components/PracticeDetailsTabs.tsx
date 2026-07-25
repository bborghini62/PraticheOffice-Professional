import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton, SecondaryButton, SectionCard } from '../../../design/components';
import { getPracticeClientDisplayName } from '../services/practicesService';
import { getActivitiesByPracticeId, updateActivityStatus } from '../../activities/services/activitiesService';
import { PracticeTimeline } from '../../timeline/components/PracticeTimeline';
import { getEventsByPracticeId } from '../../timeline/services/timelineService';
import { getDocumentsByPracticeId } from '../../documents/services/documentsService';
import { useNotification } from '../../../core/runtime/useNotification';
import type { PracticePriority, PracticeRecord, PracticeStatus } from '../practices.types';

interface PracticeDetailsTabsProps {
  practice: PracticeRecord;
}

export const PracticeDetailsTabs = ({ practice }: PracticeDetailsTabsProps) => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [activeTab, setActiveTab] = useState(0);

  const statusLabels: Record<PracticeStatus, string> = {
    draft: 'Bozza',
    open: 'Aperta',
    in_progress: 'In corso',
    waiting: 'In attesa',
    under_review: 'In revisione',
    approved: 'Approvata',
    completed: 'Completata',
    archived: 'Archiviata',
    cancelled: 'Annullata',
  };

  const priorityLabels: Record<PracticePriority, string> = {
    low: 'Bassa',
    normal: 'Normale',
    high: 'Alta',
    urgent: 'Urgente',
  };

  const tabItems = ['Riepilogo', 'Attività', 'Documenti', 'Comunicazioni', 'Scadenze', 'Timeline', 'Storico', 'Permessi'];

  const activities = getActivitiesByPracticeId(practice.id);
  const timelineEvents = getEventsByPracticeId(practice.id);
  const linkedDocuments = getDocumentsByPracticeId(practice.id);

  const summaryItems = [
    { label: 'Cliente', value: getPracticeClientDisplayName(practice) },
    { label: 'Contatto', value: 'Marco Bellini' },
    { label: 'Tipo pratica', value: 'Permesso edilizio' },
    { label: 'Gruppo', value: practice.group },
    { label: 'Responsabile', value: practice.responsible },
    { label: 'Data apertura', value: new Date(practice.updatedAt).toLocaleDateString('it-IT') },
    { label: 'Data scadenza', value: new Date(practice.dueDate).toLocaleDateString('it-IT') },
    { label: 'Stato', value: statusLabels[practice.status] },
    { label: 'Priorità', value: priorityLabels[practice.priority] },
  ];

  const handleNewActivity = () => {
    navigate(`/pratiche/${practice.id}/attivita/nuova`);
  };

  const handleNewDocument = () => {
    navigate(`/pratiche/${practice.id}/documenti/nuovo`);
  };

  const handleOpenDocument = (documentId: string) => {
    navigate(`/documenti/${documentId}`);
  };

  const handleCompleteActivity = (activityId: string) => {
    const updated = updateActivityStatus(activityId, 'completed');
    if (updated) {
      showNotification({ message: 'Attività completata', severity: 'success' });
      return;
    }

    showNotification({ message: 'Impossibile aggiornare l’attività richiesta.', severity: 'info' });
  };

  return (
    <SectionCard>
      <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)} variant="scrollable" scrollButtons="auto" sx={{ mb: 2 }}>
        {tabItems.map((label) => (
          <Tab key={label} label={label} />
        ))}
      </Tabs>

      {activeTab === 0 && (
        <Box sx={{ display: 'grid', gap: 2 }}>
          <Typography variant="body1">{practice.subject}</Typography>
          <Typography variant="body2" color="text.secondary">
            La pratica è stata avviata e segue il flusso operativo standard con monitoraggio della documentazione, delle attività e delle scadenze.
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 1.5 }}>
            {summaryItems.map((item) => (
              <Box key={item.label} sx={{ p: 1.5, borderRadius: 2, border: '1px solid', borderColor: 'divider', bgcolor: 'grey.50' }}>
                <Typography variant="body2" color="text.secondary">{item.label}</Typography>
                <Typography variant="subtitle2" sx={{ mt: 0.25 }}>
                  {item.value}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ p: 1.5, borderRadius: 2, border: '1px solid', borderColor: 'divider', bgcolor: 'grey.50' }}>
            <Typography variant="subtitle2" sx={{ mb: 0.75 }}>
              Descrizione
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Richiesta di verifica e completamento del dossier amministrativo con aggiornamento del workflow interno e pianificazione delle verifiche tecniche.
            </Typography>
          </Box>
        </Box>
      )}

      {activeTab === 1 && (
        <Box sx={{ display: 'grid', gap: 1.25 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
            <Typography variant="subtitle2">Attività collegate</Typography>
            <PrimaryButton size="small" onClick={handleNewActivity}>
              Nuova attività
            </PrimaryButton>
          </Box>
          {activities.length > 0 ? (
            activities.map((activity) => (
              <Box key={activity.id} sx={{ p: 1.35, borderRadius: 2, border: '1px solid', borderColor: 'divider', bgcolor: 'grey.50' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
                  <Box>
                    <Typography variant="subtitle2">{activity.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {activity.code} • {activity.assignee}
                    </Typography>
                  </Box>
                  <SecondaryButton size="small" onClick={() => handleCompleteActivity(activity.id)}>
                    Completa
                  </SecondaryButton>
                </Box>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              Nessuna attività collegata a questa pratica per il momento.
            </Typography>
          )}
        </Box>
      )}

      {activeTab === 2 && (
        <Box sx={{ display: 'grid', gap: 1.25 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
            <Typography variant="subtitle2">Documenti collegati</Typography>
            <PrimaryButton size="small" onClick={handleNewDocument}>
              Nuovo documento
            </PrimaryButton>
          </Box>
          {linkedDocuments.length > 0 ? (
            linkedDocuments.map((document) => (
              <Box key={document.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1.2, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <Box>
                  <Typography variant="subtitle2">{document.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {document.code} • {document.owner}
                  </Typography>
                </Box>
                <SecondaryButton size="small" onClick={() => handleOpenDocument(document.id)}>
                  Apri
                </SecondaryButton>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              Nessun documento collegato a questa pratica per il momento.
            </Typography>
          )}
        </Box>
      )}

      {activeTab === 3 && (
        <Box sx={{ display: 'grid', gap: 1.25 }}>
          <Typography variant="subtitle2">Comunicazioni</Typography>
          <Typography variant="body2" color="text.secondary">
            Nessuna comunicazione in sospeso. Il team ha già condiviso le istruzioni operative di avanzamento.
          </Typography>
        </Box>
      )}

      {activeTab === 4 && (
        <Box sx={{ display: 'grid', gap: 1.25 }}>
          <Typography variant="subtitle2">Scadenze</Typography>
          <Typography variant="body2" color="text.secondary">
            Scadenza amministrativa il {new Date(practice.dueDate).toLocaleDateString('it-IT')} con verifica finale pianificata entro 48 ore.
          </Typography>
        </Box>
      )}

      {activeTab === 5 && (
        <Box sx={{ display: 'grid', gap: 1.25 }}>
          <Typography variant="subtitle2">Timeline</Typography>
          <PracticeTimeline events={timelineEvents} />
        </Box>
      )}

      {activeTab === 6 && (
        <Box sx={{ display: 'grid', gap: 1.25 }}>
          <Typography variant="subtitle2">Storico</Typography>
          <Typography variant="body2" color="text.secondary">
            24/07/2026 • Stato aggiornato da Bozza a Aperta
          </Typography>
          <Typography variant="body2" color="text.secondary">
            23/07/2026 • Assegnazione del responsabile
          </Typography>
        </Box>
      )}

      {activeTab === 7 && (
        <Box sx={{ display: 'grid', gap: 1.25 }}>
          <Typography variant="subtitle2">Permessi</Typography>
          <Typography variant="body2" color="text.secondary">
            Accesso completo per il gruppo tecnico e visualizzazione limitata per il supporto amministrativo.
          </Typography>
        </Box>
      )}
    </SectionCard>
  );
};
