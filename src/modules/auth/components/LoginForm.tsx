import { Alert, Box, Checkbox, FormControlLabel, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import { PrimaryButton, SecondaryButton, SectionCard } from '../../../design/components';
import type { LoginCredentials } from '../auth.types';

interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => Promise<void>;
  isSubmitting: boolean;
  errorMessage?: string;
}

export const LoginForm = ({ onSubmit, isSubmitting, errorMessage }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit({ email, password, rememberMe });
  };

  return (
    <SectionCard sx={{ maxWidth: 480, width: '100%', p: { xs: 3, md: 4 } }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Accedi a PraticheOffice Professional
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Inserisci le credenziali demo per continuare con la sessione dimostrativa.
          </Typography>
        </Box>

        {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              fullWidth
              autoComplete="email"
            />
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              fullWidth
              autoComplete="current-password"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton aria-label="Mostra o nascondi password" onClick={() => setShowPassword((current) => !current)} edge="end">
                        {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <FormControlLabel
              control={<Checkbox checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} />}
              label="Ricordami"
            />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <PrimaryButton type="submit" disabled={isSubmitting} fullWidth>
                {isSubmitting ? 'Accesso in corso…' : 'Accedi'}
              </PrimaryButton>
              <SecondaryButton type="button" fullWidth onClick={() => { setEmail(''); setPassword(''); setRememberMe(false); }}>
                Cancella
              </SecondaryButton>
            </Stack>
          </Stack>
        </Box>

        <Typography variant="body2" color="text.secondary">
          Le credenziali demo sono consentite solo per l’uso dimostrativo. Non memorizziamo la password nella sessione e non la esponiamo nei log.
        </Typography>
      </Stack>
    </SectionCard>
  );
};
