import { useState } from 'react';
import { Alert, Box, Button, Chip, Stack, TextField, Typography } from '@mui/material';
import CloudDoneRounded from '@mui/icons-material/CloudDoneRounded';
import CloudOffRounded from '@mui/icons-material/CloudOffRounded';
import SyncRounded from '@mui/icons-material/SyncRounded';
import { SectionCard } from '../../../design/components';
import { loadCloudConfig, saveCloudConfig, testGoogleCloudConnection } from '../../../core/cloud';
import type { CloudConfig, CloudHealthData } from '../../../core/cloud';

interface GoogleCloudConnectionCardProps {
  isAdmin: boolean;
}

type TestStatus = 'idle' | 'testing' | 'success' | 'error';

export const GoogleCloudConnectionCard = ({ isAdmin }: GoogleCloudConnectionCardProps) => {
  const [config, setConfig] = useState<CloudConfig>(() => loadCloudConfig());
  const [status, setStatus] = useState<TestStatus>('idle');
  const [message, setMessage] = useState('');
  const [health, setHealth] = useState<CloudHealthData | null>(null);

  const updateField = (field: keyof CloudConfig, value: string) => {
    setConfig((current) => ({ ...current, [field]: value }));
    setStatus('idle');
    setMessage('');
    setHealth(null);
  };

  const handleSave = () => {
    const normalized = saveCloudConfig(config);
    setConfig(normalized);
    setStatus('idle');
    setMessage('Configurazione salvata su questo dispositivo.');
  };

  const handleTest = async () => {
    setStatus('testing');
    setMessage('Controllo del servizio cloud in corso…');
    setHealth(null);

    try {
      const result = await testGoogleCloudConnection(config);
      setHealth(result);
      setStatus('success');
      setMessage('Collegamento con Google Apps Script riuscito.');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Impossibile collegarsi al servizio cloud.');
    }
  };

  const cloudReady = health?.configured === true;

  return (
    <SectionCard>
      <Stack spacing={2.5}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2, flexWrap: 'wrap' }}>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Google Cloud multiutente
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Database condiviso su Google Sheets e archivio documenti su Google Drive, senza server locale.
            </Typography>
          </Box>
          <Chip
            icon={cloudReady ? <CloudDoneRounded /> : <CloudOffRounded />}
            label={cloudReady ? 'Cloud configurato' : 'Cloud da configurare'}
            color={cloudReady ? 'success' : 'default'}
            variant={cloudReady ? 'filled' : 'outlined'}
          />
        </Box>

        <TextField
          label="URL Web App Google Apps Script"
          value={config.webAppUrl}
          onChange={(event) => updateField('webAppUrl', event.target.value)}
          placeholder="https://script.google.com/macros/s/.../exec"
          fullWidth
          disabled={!isAdmin}
          helperText="Incolla l’URL /exec ottenuto dopo la distribuzione dello script."
        />

        <TextField
          label="Google OAuth Client ID"
          value={config.googleClientId}
          onChange={(event) => updateField('googleClientId', event.target.value)}
          placeholder="000000000000-xxxxxxxx.apps.googleusercontent.com"
          fullWidth
          disabled={!isAdmin}
          helperText="Non è una password: servirà per identificare in sicurezza gli utenti Google."
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          {isAdmin ? (
            <Button variant="contained" onClick={handleSave} disabled={!config.webAppUrl.trim()}>
              Salva configurazione
            </Button>
          ) : null}
          <Button
            variant="outlined"
            startIcon={<SyncRounded />}
            onClick={handleTest}
            disabled={!config.webAppUrl.trim() || status === 'testing'}
          >
            {status === 'testing' ? 'Verifica in corso…' : 'Test collegamento'}
          </Button>
        </Stack>

        {message ? <Alert severity={status === 'error' ? 'error' : status === 'success' ? 'success' : 'info'}>{message}</Alert> : null}

        {health ? (
          <Typography variant="caption" color="text.secondary">
            Servizio {health.service} · versione {health.version} · Database {health.databaseConfigured ? 'OK' : 'non configurato'} · Drive{' '}
            {health.driveConfigured ? 'OK' : 'non configurato'} · OAuth {health.oauthConfigured ? 'OK' : 'non configurato'}
          </Typography>
        ) : null}
      </Stack>
    </SectionCard>
  );
};
