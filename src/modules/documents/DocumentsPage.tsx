import { Box, Paper } from '@mui/material';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer, PageTitle, SectionCard, PrimaryButton } from '../../design/components';
import { useNotification } from '../../core/runtime/useNotification';
import { DocumentsFilters } from './components/DocumentsFilters';
import { DocumentsTable } from './components/DocumentsTable';
import { EmptyDocumentsState } from './components/EmptyDocumentsState';
import { filterDocuments, getDocuments } from './services/documentsService';
import type { DocumentRecord, DocumentsFilters as DocumentsFilterState } from './documents.types';

const initialFilters: DocumentsFilterState = {
  search: '',
  status: 'all',
  category: 'all',
  practiceId: 'all',
  owner: 'all',
};

const DocumentsPage = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [filters, setFilters] = useState<DocumentsFilterState>(initialFilters);

  const documents = useMemo(() => getDocuments(), []);
  const filteredDocuments = useMemo(() => filterDocuments(documents, filters.search, filters.status, filters.category, filters.practiceId, filters.owner), [documents, filters]);

  const handleOpenDocument = (document: DocumentRecord) => {
    navigate(`/documenti/${document.id}`);
    showNotification({ message: `Hai aperto ${document.code}`, severity: 'info' });
  };

  const handleNewDocument = () => {
    navigate('/documenti/nuovo');
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <PageContainer>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 2 }}>
        <Box>
          <PageTitle subtitle="Gestisci documenti, versioni e allegati collegati alle pratiche.">Documenti</PageTitle>
        </Box>
        <PrimaryButton onClick={handleNewDocument}>Nuovo documento</PrimaryButton>
      </Box>
      <SectionCard>
        <DocumentsFilters filters={filters} onFiltersChange={setFilters} onReset={handleResetFilters} />
      </SectionCard>
      <Paper sx={{ p: { xs: 2, md: 2.5 }, borderRadius: 3 }}>
        {filteredDocuments.length > 0 ? (
          <DocumentsTable documents={filteredDocuments} onOpenDocument={handleOpenDocument} />
        ) : (
          <EmptyDocumentsState onReset={handleResetFilters} />
        )}
      </Paper>
    </PageContainer>
  );
};

export default DocumentsPage;
