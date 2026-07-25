import { Box, Divider, Grid, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageContainer, PageTitle, SectionCard, EmptyState } from '../../design/components';
import { PracticeHeader } from './components/PracticeHeader';
import { PracticeDetailsTabs } from './components/PracticeDetailsTabs';
import { getPracticeById } from './services/practicesService';

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

  return (
    <PageContainer>
      <PageTitle subtitle="Visualizza i dettagli e il contesto operativo della pratica selezionata.">Dettaglio pratica</PageTitle>
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
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Gruppo
                </Typography>
                <Typography variant="subtitle1">{practice.group}</Typography>
              </Box>
              <Divider />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Area di attenzione
                </Typography>
                <Typography variant="subtitle1">Verifica documentale e coordinamento interno</Typography>
              </Box>
              <Divider />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Note di supporto
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  La pratica è pronta per la successiva valutazione del team e per eventuali aggiornamenti di stato.
                </Typography>
              </Box>
            </Box>
          </SectionCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default PracticeDetailPage;
