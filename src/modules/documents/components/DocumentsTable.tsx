import { Box, IconButton, Typography } from '@mui/material';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { DataTable } from '../../../design/components';
import { getPracticeById } from '../../practices/services/practicesService';
import { DocumentStatusBadge } from './DocumentStatusBadge';
import type { DocumentRecord } from '../documents.types';

interface DocumentsTableProps {
  documents: DocumentRecord[];
  onOpenDocument: (document: DocumentRecord) => void;
}

export const DocumentsTable = ({ documents, onOpenDocument }: DocumentsTableProps) => (
  <DataTable columns={['Codice', 'Nome documento', 'Pratica', 'Categoria', 'Versione', 'Stato', 'Proprietario', 'Ultimo aggiornamento', 'Azioni']}>
    {documents.map((document) => {
      const practice = getPracticeById(document.practiceId);
      return (
        <tr key={document.id}>
          <td>{document.code}</td>
          <td>
            <Typography variant="subtitle2">{document.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {document.description}
            </Typography>
          </td>
          <td>{practice ? `${practice.code} • ${practice.subject}` : 'Non assegnata'}</td>
          <td>{document.category === 'received' ? 'Documento ricevuto' : document.category === 'produced' ? 'Documento prodotto' : document.category === 'communication' ? 'Comunicazione' : document.category === 'signed' ? 'Documento firmato' : document.category === 'attachment' ? 'Allegato' : 'Altro'}</td>
          <td>{document.version}</td>
          <td>
            <DocumentStatusBadge status={document.status} />
          </td>
          <td>{document.owner}</td>
          <td>{new Date(document.lastUpdatedAt).toLocaleDateString('it-IT')}</td>
          <td>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton color="primary" onClick={() => onOpenDocument(document)}>
                <OpenInNewRoundedIcon />
              </IconButton>
            </Box>
          </td>
        </tr>
      );
    })}
  </DataTable>
);
