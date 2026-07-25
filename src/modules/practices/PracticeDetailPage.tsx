import { Box, Divider, Grid, Link, Typography } from '@mui/material';
import { useMemo } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { appRoutes } from '../../core/router/routes';
import { PageContainer, PageTitle, SectionCard, EmptyState } from '../../design/components';
import { PracticeHeader } from './components/PracticeHeader';
import { PracticeDetailsTabs } from './components/PracticeDetailsTabs';
import { getPracticeById, getPracticeClientDisplayName } from './services/practicesService';
import { getLatestEventByPracticeId } from '../timeline/services/timelineService';

export const PracticeDetailPage = () => {
  const { practiceId } = useParams<{ practiceId: string }>();
  const navigate = useNavigate();

  const practice = useMemo(() => (practiceId ? getPracticeById(practiceId) : undefined), [practiceId]);

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

  return (
    <PageContainer>
      <PageTitle subtitle={`${practice.code} • ${practice.subject}`}>Scheda pratica</PageTitle>
      <PracticeHeader
        practice={practice}
        onEdit={() => navigate('/pratiche')}
        onChangeStatus={() => navigate('/pratiche')}
        onMoreActions={() => navigate('/pratiche')}
      />
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
                <Typography variant="subtitle1">3 allegati</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Stato workflow
                </Typography>
                <Typography variant="subtitle1">In verifica</Typography>
              </Box>
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
