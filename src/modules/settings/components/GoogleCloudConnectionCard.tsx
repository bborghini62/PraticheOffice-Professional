import { useEffect, useRef, useState } from 'react';
import { Alert, Box, Button, Chip, Stack, TextField, Typography } from '@mui/material';
import CloudDoneRounded from '@mui/icons-material/CloudDoneRounded';
import CloudOffRounded from '@mui/icons-material/CloudOffRounded';
import SyncRounded from '@mui/icons-material/SyncRounded';
import { SectionCard } from '../../../design/components';
import {
  clearGoogleIdToken,
  disconnectGoogleIdentity,
  getGoogleCloudSession,
  isGoogleCloudSessionExpired,
  loadCloudConfig,
  renderGoogleSignInButton,
  saveCloudConfig,
  saveGoogleIdToken,
  testGoogleCloudConnection,
} from '../../../core/cloud';
import type { CloudConfig, CloudHealthData, CloudSession } from '../../../core/cloud';

interface GoogleCloudConnectionCardProps {
  isAdmin: boolean;
}

type TestStatus = 'idle' | 'testing' | 'success' | 'error';
type GoogleAuthStatus = 'disconnected' | 'connecting' | 'connected' | 'expired';

export const GoogleCloudConnectionCard = ({ isAdmin }: GoogleCloudConnectionCardProps) => {
  const [config, setConfig] = useState<CloudConfig>(() => loadCloudConfig());
  const [status, setStatus] = useState<TestStatus>('idle');
  const [message, setMessage] = useState('');
  const [googleSignInMessage, setGoogleSignInMessage] = useState('');
  const [health, setHealth] = useState<CloudHealthData | null>(null);
  const [cloudSession, setCloudSession] = useState<CloudSession | null>(() => getGoogleCloudSession());
  const googleButtonContainerRef = useRef<HTMLDivElement | null>(null);
  const [googleAuthStatus, setGoogleAuthStatus] = useState<GoogleAuthStatus>(() => {
    if (isGoogleCloudSessionExpired()) {
      return 'expired';
    }
    return getGoogleCloudSession() ? 'connected' : 'disconnected';
  });

  const updateField = (field: keyof CloudConfig, value: string) => {
    setConfig((current) => ({ ...current, [field]: value }));
    setStatus('idle');
    setMessage('');
    setGoogleSignInMessage('');
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

  useEffect(() => {
    const container = googleButtonContainerRef.current;
    if (!isAdmin || !container) {
      return;
    }

    let active = true;
    container.replaceChildren();

    const clientId = config.googleClientId.trim();
    if (!clientId) {
      setGoogleAuthStatus('disconnected');
      setGoogleSignInMessage('Google OAuth Client ID mancante. Configuralo nelle Impostazioni Cloud.');
      return;
    }

    const setupButton = async () => {
      try {
        await renderGoogleSignInButton({
          container,
          googleClientId: clientId,
          onCredential: (credential) => {
            if (!active) {
              return;
            }

            const session = saveGoogleIdToken(credential);
            setCloudSession(session);
            setGoogleAuthStatus('connected');
            setStatus('success');
            setMessage(`Collegato come ${session.name} (${session.email}).`);
            setGoogleSignInMessage('');
          },
          onError: (error) => {
            if (!active) {
              return;
            }

            const detail = error instanceof Error ? error.message : 'Impossibile completare il login Google.';
            setGoogleAuthStatus('disconnected');
            setGoogleSignInMessage(detail === 'Google non ha restituito una credential valida.' ? 'Credential mancante: seleziona un account Google e riprova.' : detail);
          },
        });

        if (!active) {
          return;
        }

        setGoogleAuthStatus(cloudSession ? 'connected' : 'disconnected');
        setGoogleSignInMessage('');
      } catch (error) {
        if (!active) {
          return;
        }

        const detail = error instanceof Error ? error.message : 'Pulsante Google non caricato.';
        setGoogleAuthStatus('disconnected');
        setGoogleSignInMessage(detail);
      }
    };

    void setupButton();

    return () => {
      active = false;
      container.replaceChildren();
    };
  }, [cloudSession, config.googleClientId, isAdmin]);

  const handleGoogleDisconnect = async () => {
    const email = cloudSession?.email;
    try {
      await disconnectGoogleIdentity(email);
    } catch {
      // Keep local disconnect behavior even if revoke fails.
    }

    clearGoogleIdToken();
    setCloudSession(null);
    setGoogleAuthStatus('disconnected');
    setStatus('idle');
    setMessage('Sessione Google disconnessa.');
  };

  const cloudReady = health?.configured === true;
  const googleConnected = googleAuthStatus === 'connected' && Boolean(cloudSession);
  const googleExpired = googleAuthStatus === 'expired';
  const googleConnecting = googleAuthStatus === 'connecting';

  const showGoogleSignInError = googleSignInMessage.trim().length > 0;

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
          <Chip
            icon={googleConnected ? <CloudDoneRounded /> : <CloudOffRounded />}
            label={googleConnected ? 'Collegato come utente Google' : googleConnecting ? 'Collegamento Google in corso' : googleExpired ? 'Sessione Google scaduta' : 'Utente Google non collegato'}
            color={googleConnected ? 'success' : googleConnecting || googleExpired ? 'warning' : 'default'}
            variant={googleConnected ? 'filled' : 'outlined'}
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

        <TextField
          label="Sessione Google"
          value={cloudSession ? `${cloudSession.name} <${cloudSession.email}>` : 'Nessuna sessione attiva'}
          fullWidth
          disabled
          helperText={cloudSession?.expiresAt
            ? `Scadenza sessione: ${new Date(cloudSession.expiresAt).toLocaleString('it-IT')}.`
            : cloudSession
              ? 'Sessione attiva (scadenza non disponibile nel token).'
              : googleExpired
                ? 'Sessione scaduta: accedi di nuovo con Google.'
                : 'Usa "Accedi con Google" per autorizzare le chiamate cloud.'}
        />

        <Stack spacing={1}>
          <Typography variant="body2" color="text.secondary">
            Accesso esplicito tramite pulsante ufficiale Google.
          </Typography>
          <Box
            ref={googleButtonContainerRef}
            sx={{ minHeight: 44, display: 'flex', alignItems: 'center' }}
          />
          {showGoogleSignInError ? <Alert severity="error">{googleSignInMessage}</Alert> : null}
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          {isAdmin ? (
            <Button variant="contained" onClick={handleSave} disabled={!config.webAppUrl.trim()}>
              Salva configurazione
            </Button>
          ) : null}
          {isAdmin ? <Button variant="text" color="inherit" onClick={handleGoogleDisconnect} disabled={!cloudSession}>Disconnetti Google</Button> : null}
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
