export interface CloudConfig {
  webAppUrl: string;
  googleClientId: string;
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
