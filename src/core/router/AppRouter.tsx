// Application router entry point that wires the layout and lazy-loaded pages.

import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from '../layout/MainLayout';
import { appRoutes } from './routes';

const DashboardPage = lazy(() => import('../../modules/dashboard/DashboardPage'));
const PracticesPage = lazy(() => import('../../modules/practices/PracticesPage'));
const NewPracticePage = lazy(() => import('../../modules/practices/NewPracticePage'));
const PracticeDetailPage = lazy(() => import('../../modules/practices/PracticeDetailPage'));
const ClientsPage = lazy(() => import('../../modules/clients/ClientsPage'));
const NewClientPage = lazy(() => import('../../modules/clients/NewClientPage'));
const ClientDetailPage = lazy(() => import('../../modules/clients/ClientDetailPage'));
const SettingsPage = lazy(() => import('../../modules/settings/SettingsPage'));

export const AppRouter = () => (
  <Suspense fallback={<div />}> 
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={appRoutes.dashboard.path} element={<DashboardPage />} />
        <Route path={appRoutes.practices.path} element={<PracticesPage />} />
        <Route path={appRoutes.newPractice.path} element={<NewPracticePage />} />
        <Route path={appRoutes.practiceDetail.path} element={<PracticeDetailPage />} />
        <Route path={appRoutes.clients.path} element={<ClientsPage />} />
        <Route path={appRoutes.newClient.path} element={<NewClientPage />} />
        <Route path={appRoutes.clientDetail.path} element={<ClientDetailPage />} />
        <Route path={appRoutes.settings.path} element={<SettingsPage />} />
        <Route path="*" element={<Navigate to={appRoutes.dashboard.path} replace />} />
      </Route>
    </Routes>
  </Suspense>
);
