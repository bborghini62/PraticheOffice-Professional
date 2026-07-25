import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { SectionCard } from '../../../design/components';
import { getPractices } from '../../practices/services/practicesService';
import type { ClientRecord } from '../clients.types';

interface ClientDetailsTabsProps {
  client: ClientRecord;
}

export const ClientDetailsTabs = ({ client }: ClientDetailsTabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabItems = ['Riepilogo', 'Contatti', 'Pratiche', 'Documenti', 'Comunicazioni', 'Storico'];

  const displayName = [client.companyName, `${client.firstName} ${client.lastName}`.trim()].filter(Boolean).join(' ') || client.contactPerson;
  const linkedPractices = useMemo(() => getPractices().filter((practice) => practice.clientId === client.id), [client.id]);

  return (
    <SectionCard>
      <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)} variant="scrollable" scrollButtons="auto" sx={{ mb: 2 }}>
        {tabItems.map((label) => (
          <Tab key={label} label={label} />
        ))}
      </Tabs>

      {activeTab === 0 && (
        <Box sx={{ display: 'grid', gap: 2 }}>
          <Typography variant="body1">{displayName}</Typography>
          <Typography variant="body2" color="text.secondary">
            Anagrafica cliente in gestione operativa con recapiti, dati fiscali e storico aggiornato.
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 1.5 }}>
            {[
              { label: 'Codice', value: client.code },
              { label: 'Referente', value: client.contactPerson },
              { label: 'Email', value: client.email },
              { label: 'Telefono', value: client.phone || client.mobile },
              { label: 'CF / P.IVA', value: client.vatNumber || client.fiscalCode },
              { label: 'Indirizzo', value: `${client.address} • ${client.postalCode} ${client.city}` },
            ].map((item) => (
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
              Note
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {client.notes || 'Nessuna nota aggiuntiva disponibile.'}
            </Typography>
          </Box>
        </Box>
      )}

      {activeTab === 1 && (
        <Box sx={{ display: 'grid', gap: 1.25 }}>
          <Typography variant="subtitle2">Contatti</Typography>
          <Typography variant="body2" color="text.secondary">
            Email: {client.email || 'Non disponibile'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            PEC: {client.pec || 'Non disponibile'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Cellulare: {client.mobile || 'Non disponibile'}
          </Typography>
        </Box>
      )}

      {activeTab === 2 && (
        <Box sx={{ display: 'grid', gap: 1.25 }}>
          <Typography variant="subtitle2">Pratiche collegate</Typography>
          {linkedPractices.length > 0 ? (
            linkedPractices.map((practice) => (
              <Box key={practice.id} sx={{ p: 1.2, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="subtitle2">{practice.subject}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {practice.code} • {practice.status === 'open' ? 'Aperta' : 'In gestione'}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              Nessuna pratica collegata al cliente per il momento.
            </Typography>
          )}
        </Box>
      )}

      {activeTab === 3 && (
        <Box sx={{ display: 'grid', gap: 1.25 }}>
          <Typography variant="subtitle2">Documenti</Typography>
          <Typography variant="body2" color="text.secondary">
            Nessun documento allegato per il momento.
          </Typography>
        </Box>
      )}

      {activeTab === 4 && (
        <Box sx={{ display: 'grid', gap: 1.25 }}>
          <Typography variant="subtitle2">Comunicazioni</Typography>
          <Typography variant="body2" color="text.secondary">
            Nessuna comunicazione registrata al momento.
          </Typography>
        </Box>
      )}

      {activeTab === 5 && (
        <Box sx={{ display: 'grid', gap: 1.25 }}>
          <Typography variant="subtitle2">Storico</Typography>
          <Typography variant="body2" color="text.secondary">
            20/07/2026 • Anagrafica aggiornata
          </Typography>
          <Typography variant="body2" color="text.secondary">
            18/07/2026 • Inserimento del referente principale
          </Typography>
        </Box>
      )}
    </SectionCard>
  );
};
