import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import { SectionCard } from '../../../design/components';
import type { PracticePriority, PracticeRecord, PracticeStatus } from '../practices.types';

interface PracticeDetailsTabsProps {
  practice: PracticeRecord;
}

export const PracticeDetailsTabs = ({ practice }: PracticeDetailsTabsProps) => {
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

  const summaryItems = [
    { label: 'Cliente', value: 'Alpha Costruzioni S.r.l.' },
    { label: 'Contatto', value: 'Marco Bellini' },
    { label: 'Tipo pratica', value: 'Permesso edilizio' },
    { label: 'Gruppo', value: practice.group },
    { label: 'Responsabile', value: practice.responsible },
    { label: 'Data apertura', value: new Date(practice.updatedAt).toLocaleDateString('it-IT') },
    { label: 'Data scadenza', value: new Date(practice.dueDate).toLocaleDateString('it-IT') },
    { label: 'Stato', value: statusLabels[practice.status] },
    { label: 'Priorità', value: priorityLabels[practice.priority] },
  ];

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
          <Typography variant="subtitle2">Cronologia operativa</Typography>
          {['Richiesta ricevuta e assegnata al team responsabile', 'Verifica documentale in corso', 'Aggiornamento previsto entro la scadenza'].map((item) => (
            <Box key={item} sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main', mt: 0.7 }} />
              <Typography variant="body2" color="text.secondary">
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {activeTab === 2 && (
        <Box sx={{ display: 'grid', gap: 1.25 }}>
          <Typography variant="subtitle2">Documenti allegati</Typography>
          {['Documento tecnico.pdf', 'Certificato anagrafico.pdf', 'Lettera di accompagnamento.docx'].map((document) => (
            <Box key={document} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1.2, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="body2">{document}</Typography>
              <Typography variant="caption" color="text.secondary">Aggiornato</Typography>
            </Box>
          ))}
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
          <Typography variant="body2" color="text.secondary">
            09:30 • Inizio analisi documentale
          </Typography>
          <Typography variant="body2" color="text.secondary">
            11:00 • Richiesta di integrazione ai referenti
          </Typography>
          <Typography variant="body2" color="text.secondary">
            14:30 • Conferma di ricezione documenti
          </Typography>
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
