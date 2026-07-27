export interface CloudConfig {
  webAppUrl: string;
  googleClientId: string;
}

export interface CloudSession {
  idToken: string;
  email: string;
  name: string;
  expiresAt: number | null;
  updatedAt: number;
}

export interface CloudHealthData {
  service: string;
  version: string;
  timestamp: string;
  configured: boolean;
  databaseConfigured: boolean;
  driveConfigured: boolean;
  oauthConfigured: boolean;
}

export interface CloudApiError {
  code: string;
  message: string;
}

export interface CloudApiResponse<T> {
  ok: boolean;
  data?: T;
  error?: CloudApiError;
  requestId?: string;
}

export interface GoogleCredentialPayload {
  email?: string;
  name?: string;
  exp?: number;
}
