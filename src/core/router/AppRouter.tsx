// Application router entry point that wires the layout and lazy-loaded pages.

import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from '../layout/MainLayout';
import { appRoutes } from './routes';

const DashboardPage = lazy(() => import('../../modules/dashboard/DashboardPage'));
const SettingsPage = lazy(() => import('../../modules/settings/SettingsPage'));

export const AppRouter = () => (
  <Suspense fallback={<div />}> 
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={appRoutes.dashboard.path} element={<DashboardPage />} />
        <Route path={appRoutes.settings.path} element={<SettingsPage />} />
        <Route path="*" element={<Navigate to={appRoutes.dashboard.path} replace />} />
      </Route>
    </Routes>
  </Suspense>
);
