import { Box, Grid, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EmptyState, PageContainer, PageTitle, SectionCard } from '../../design/components';
import { DocumentDetailsTabs } from './components/DocumentDetailsTabs';
import { DocumentHeader } from './components/DocumentHeader';
import { getDocumentById } from './services/documentsService';

export const DocumentDetailPage = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const navigate = useNavigate();

  const document = useMemo(() => (documentId ? getDocumentById(documentId) : undefined), [documentId]);

  if (!document) {
    return (
      <PageContainer>
        <EmptyState title="Documento non trovato" description="Il documento richiesto non è disponibile o è stato rimosso dall’elenco corrente." actionLabel="Torna ai documenti" onAction={() => navigate('/documenti')} />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageTitle subtitle={`${document.code} • ${document.name}`}>Scheda documento</PageTitle>
      <DocumentHeader title={document.name} subtitle={`${document.code} • ${document.owner}`} onEdit={() => navigate('/documenti')} onMoreActions={() => navigate('/documenti')} />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <DocumentDetailsTabs document={document} />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <SectionCard>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Dati operativi
            </Typography>
            <Box sx={{ display: 'grid', gap: 1.5 }}>
              <Box sx={{ p: 1.25, borderRadius: 2, bgcolor: 'grey.50', border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="body2" color="text.secondary">Pratica</Typography>
                <Typography variant="subtitle1">{document.practiceId}</Typography>
              </Box>
              <Box sx={{ p: 1.25, borderRadius: 2, bgcolor: 'grey.50', border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="body2" color="text.secondary">Ultimo aggiornamento</Typography>
                <Typography variant="subtitle1">{new Date(document.lastUpdatedAt).toLocaleDateString('it-IT')}</Typography>
              </Box>
              <Box sx={{ p: 1.25, borderRadius: 2, bgcolor: 'grey.50', border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="body2" color="text.secondary">Note</Typography>
                <Typography variant="subtitle1">{document.notes || 'Nessuna nota aggiuntiva.'}</Typography>
              </Box>
            </Box>
          </SectionCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default DocumentDetailPage;
