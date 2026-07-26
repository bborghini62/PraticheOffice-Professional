import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Link, Menu, MenuItem, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { PrimaryButton, SecondaryButton } from '../../design/components';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { appRoutes } from '../../core/router/routes';
import { PageContainer, PageTitle, SectionCard, EmptyState } from '../../design/components';
import { useNotification } from '../../core/runtime/useNotification';
import { useAuth } from '../auth/context/useAuth';
import { PracticeHeader } from './components/PracticeHeader';
import { PracticeDetailsTabs } from './components/PracticeDetailsTabs';
import { EditPracticeDialog } from './components/EditPracticeDialog';
import { WorkflowTransitionDialog } from '../workflow/components/WorkflowTransitionDialog';
import { addPractice as addPracticeRecord, getPracticeById, getPracticeClientDisplayName, getPractices, updatePractice } from './services/practicesService';
import { addEvent, createTimelineEvent, getLatestEventByPracticeId } from '../timeline/services/timelineService';
import { getDocumentsByPracticeId } from '../documents/services/documentsService';
import { applyWorkflowTransition, getPracticeWorkflow } from '../workflow/services/workflowService';
import type { PracticeRecord } from './practices.types';

export const PracticeDetailPage = () => {
  const { practiceId } = useParams<{ practiceId: string }>();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { user } = useAuth();
  const [practice, setPractice] = useState<PracticeRecord | undefined>(undefined);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isTransitionOpen, setIsTransitionOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [isArchiveConfirmOpen, setIsArchiveConfirmOpen] = useState(false);
  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);

  useEffect(() => {
    setPractice(practiceId ? getPracticeById(practiceId) : undefined);
  }, [practiceId]);

  const workflow = practice ? getPracticeWorkflow(practice) : undefined;
  const userRole = user?.role === 'Amministratore' ? 'Administrator' : 'Operator';
  const availableTransitions = useMemo(() => {
    if (!workflow) {
      return [];
    }

    return workflow.transitions.filter((transition) => !transition.allowedRoles || transition.allowedRoles.includes(userRole));
  }, [workflow, userRole]);

  const handlePracticeSaved = (updatedPractice: PracticeRecord) => {
    if (!practice) {
      return;
    }

    const hasResponsibleChange = practice.responsible !== updatedPractice.responsible;
    const hasGroupChange = practice.group !== updatedPractice.group;
    const hasOtherChanges =
      practice.subject !== updatedPractice.subject ||
      practice.status !== updatedPractice.status ||
      practice.priority !== updatedPractice.priority ||
      practice.dueDate !== updatedPractice.dueDate;

    const nextPractice: PracticeRecord = {
      ...updatedPractice,
      updatedAt: hasResponsibleChange || hasGroupChange || hasOtherChanges ? new Date().toISOString() : practice.updatedAt,
    };

    const savedPractice = updatePractice(nextPractice);
    if (!savedPractice) {
      showNotification({ message: 'Impossibile salvare la pratica.', severity: 'error' });
      return;
    }

    if (hasResponsibleChange) {
      addEvent(
        createTimelineEvent(
          savedPractice.id,
          'practice_assignee_changed',
          'Responsabile modificato',
          `Responsabile cambiato da ${practice.responsible} a ${savedPractice.responsible}`,
          user?.name ?? 'Sistema',
          new Date().toISOString(),
        ),
      );
    }

    if (hasGroupChange) {
      addEvent(
        createTimelineEvent(
          savedPractice.id,
          'practice_group_changed',
          'Gruppo modificato',
          `Gruppo cambiato da ${practice.group || 'Nessun gruppo'} a ${savedPractice.group || 'Nessun gruppo'}`,
          user?.name ?? 'Sistema',
          new Date().toISOString(),
        ),
      );
    }

    if (hasOtherChanges) {
      addEvent(
        createTimelineEvent(
          savedPractice.id,
          'practice_updated',
          'Pratica aggiornata',
          `La pratica ${savedPractice.subject} è stata aggiornata.`,
          user?.name ?? 'Sistema',
          new Date().toISOString(),
        ),
      );
    }

    setPractice(savedPractice);
    showNotification({ message: 'Pratica aggiornata correttamente.', severity: 'success' });
  };

  const handleApplyTransition = (transitionId: string, note: string) => {
    if (!practice) {
      return;
    }

    const result = applyWorkflowTransition(workflow?.id ?? 'workflow-standard', practice.id, transitionId, user?.name ?? 'Sistema', note);
    if (!result) {
      showNotification({ message: 'Impossibile applicare la transizione richiesta.', severity: 'error' });
      return;
    }

    setPractice(getPracticeById(practice.id));
    showNotification({ message: 'Stato della pratica aggiornato.', severity: 'success' });
  };

  const handleDuplicatePractice = () => {
    if (!practice) {
      return;
    }

    const practices = getPractices();
    const nextNumber = practices.reduce((max, candidate) => {
      const match = candidate.code.match(/(\d+)$/);
      if (!match) {
        return max;
      }
      return Math.max(max, Number.parseInt(match[1], 10));
    }, 0);
    const duplicatedPractice: PracticeRecord = {
      ...practice,
      id: `PRC-${String(nextNumber + 1).padStart(3, '0')}`,
      code: `PRC-${String(nextNumber + 1).padStart(3, '0')}`,
      subject: `${practice.subject} (copia)`,
      status: 'draft',
      updatedAt: new Date().toISOString(),
    };

    addPracticeRecord(duplicatedPractice);
    setPractice(duplicatedPractice);
    setMenuAnchor(null);
    navigate(appRoutes.practiceDetail.path.replace(':practiceId', duplicatedPractice.id));
    showNotification({ message: 'Pratica duplicata correttamente.', severity: 'success' });
  };

  const handleArchivePractice = () => {
    if (!practice) {
      return;
    }

    const archivedPractice = { ...practice, status: 'archived' as const, updatedAt: new Date().toISOString() };
    const savedPractice = updatePractice(archivedPractice);
    if (!savedPractice) {
      showNotification({ message: 'Impossibile archiviare la pratica.', severity: 'error' });
      return;
    }

    addEvent(createTimelineEvent(savedPractice.id, 'practice_status_changed', 'Pratica archiviata', `La pratica ${savedPractice.subject} è stata archiviata.`, user?.name ?? 'Sistema', new Date().toISOString()));
    setPractice(savedPractice);
    setMenuAnchor(null);
    setIsArchiveConfirmOpen(false);
    showNotification({ message: 'Pratica archiviata.', severity: 'info' });
  };

  const handleCancelPractice = () => {
    if (!practice) {
      return;
    }

    const cancelledPractice = { ...practice, status: 'cancelled' as const, updatedAt: new Date().toISOString() };
    const savedPractice = updatePractice(cancelledPractice);
    if (!savedPractice) {
      showNotification({ message: 'Impossibile annullare la pratica.', severity: 'error' });
      return;
    }

    addEvent(createTimelineEvent(savedPractice.id, 'practice_status_changed', 'Pratica annullata', `La pratica ${savedPractice.subject} è stata annullata.`, user?.name ?? 'Sistema', new Date().toISOString()));
    setPractice(savedPractice);
    setMenuAnchor(null);
    setIsCancelConfirmOpen(false);
    showNotification({ message: 'Pratica annullata.', severity: 'info' });
  };

  const handleCopyCode = async () => {
    if (!practice) {
      return;
    }

    await navigator.clipboard.writeText(practice.code);
    setMenuAnchor(null);
    showNotification({ message: 'Codice pratica copiato.', severity: 'success' });
  };

  if (!practice) {
    return (
      <PageContainer>
        <EmptyState
          title="Pratica non trovata"
          description="La pratica richiesta non è disponibile o è stata rimossa dall'elenco corrente."
          actionLabel="Torna alle pratiche"
          onAction={() => navigate('/pratiche')}
        />
      </PageContainer>
    );
  }

  const clientName = getPracticeClientDisplayName(practice);
  const clientLink = practice.clientId ? appRoutes.clientDetail.path.replace(':clientId', practice.clientId) : undefined;
  const latestTimelineEvent = getLatestEventByPracticeId(practice.id);
  const linkedDocuments = getDocumentsByPracticeId(practice.id);

  return (
    <PageContainer>
      <PageTitle subtitle={`${practice.code} • ${practice.subject}`}>Scheda pratica</PageTitle>
      <PracticeHeader
        practice={practice}
        onEdit={() => setIsEditOpen(true)}
        onChangeStatus={() => setIsTransitionOpen(true)}
        onMoreActions={(event) => setMenuAnchor(event.currentTarget)}
      />
      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
        <MenuItem onClick={handleDuplicatePractice}>Duplica pratica</MenuItem>
        <MenuItem onClick={() => setIsArchiveConfirmOpen(true)}>Archivia pratica</MenuItem>
        <MenuItem onClick={() => setIsCancelConfirmOpen(true)}>Annulla pratica</MenuItem>
        <MenuItem onClick={handleCopyCode}>Copia codice pratica</MenuItem>
      </Menu>
      <EditPracticeDialog practice={practice} open={isEditOpen} onClose={() => setIsEditOpen(false)} onSaved={handlePracticeSaved} />
      <WorkflowTransitionDialog workflow={workflow} transitions={availableTransitions} open={isTransitionOpen} onClose={() => setIsTransitionOpen(false)} onConfirm={handleApplyTransition} />
      <Dialog open={isArchiveConfirmOpen} onClose={() => setIsArchiveConfirmOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Archivia pratica</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Questa azione archiviarà la pratica corrente e manterrà il dettaglio aperto.</Typography>
        </DialogContent>
        <DialogActions>
          <SecondaryButton onClick={() => setIsArchiveConfirmOpen(false)}>Annulla</SecondaryButton>
          <PrimaryButton onClick={handleArchivePractice}>Conferma</PrimaryButton>
        </DialogActions>
      </Dialog>
      <Dialog open={isCancelConfirmOpen} onClose={() => setIsCancelConfirmOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Annulla pratica</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Questa azione annullerà la pratica corrente e manterrà il dettaglio aperto.</Typography>
        </DialogContent>
        <DialogActions>
          <SecondaryButton onClick={() => setIsCancelConfirmOpen(false)}>Annulla</SecondaryButton>
          <PrimaryButton onClick={handleCancelPractice}>Conferma</PrimaryButton>
        </DialogActions>
      </Dialog>
      <Grid container spacing={3} sx={{ mt: 0.5 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <PracticeDetailsTabs practice={practice} />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <SectionCard>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Contesto operativo
            </Typography>
            <Box sx={{ display: 'grid', gap: 1.5 }}>
              <Box sx={{ p: 1.25, borderRadius: 2, bgcolor: 'grey.50', border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="body2" color="text.secondary">
                  Gruppo
                </Typography>
                <Typography variant="subtitle1">{practice.group}</Typography>
              </Box>
              <Box sx={{ p: 1.25, borderRadius: 2, bgcolor: 'grey.50', border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="body2" color="text.secondary">
                  Cliente
                </Typography>
                {clientLink ? (
                  <Link component={RouterLink} to={clientLink} underline="hover" color="primary.main" sx={{ fontWeight: 600 }}>
                    {clientName}
                  </Link>
                ) : (
                  <Typography variant="subtitle1">{clientName}</Typography>
                )}
              </Box>
              <Box sx={{ p: 1.25, borderRadius: 2, bgcolor: 'grey.50', border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="body2" color="text.secondary">
                  Responsabile
                </Typography>
                <Typography variant="subtitle1">{practice.responsible}</Typography>
              </Box>
              <Box sx={{ p: 1.25, borderRadius: 2, bgcolor: 'grey.50', border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="body2" color="text.secondary">
                  Scadenza
                </Typography>
                <Typography variant="subtitle1">{new Date(practice.dueDate).toLocaleDateString('it-IT')}</Typography>
              </Box>
              <Divider />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Attività aperte
                </Typography>
                <Typography variant="subtitle1">3</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Documenti
                </Typography>
                <Typography variant="subtitle1">{linkedDocuments.length} allegati</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Stato workflow
                </Typography>
                <Typography variant="subtitle1">In verifica</Typography>
              </Box>
              <PrimaryButton onClick={() => navigate(appRoutes.workflow.path.replace(':practiceId', practice.id))}>
                Apri workflow
              </PrimaryButton>
              {latestTimelineEvent && (
                <Box sx={{ p: 1.25, borderRadius: 2, bgcolor: 'primary.50', border: '1px solid', borderColor: 'primary.100' }}>
                  <Typography variant="body2" color="text.secondary">
                    Ultimo evento
                  </Typography>
                  <Typography variant="subtitle2" sx={{ mt: 0.25 }}>
                    {latestTimelineEvent.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {latestTimelineEvent.description}
                  </Typography>
                </Box>
              )}
            </Box>
          </SectionCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default PracticeDetailPage;
