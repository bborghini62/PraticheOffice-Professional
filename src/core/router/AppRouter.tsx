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
const ActivitiesPage = lazy(() => import('../../modules/activities/ActivitiesPage'));
const NewActivityPage = lazy(() => import('../../modules/activities/NewActivityPage'));
const DocumentsPage = lazy(() => import('../../modules/documents/DocumentsPage'));
const NewDocumentPage = lazy(() => import('../../modules/documents/NewDocumentPage'));
const DocumentDetailPage = lazy(() => import('../../modules/documents/DocumentDetailPage'));
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
        <Route path={appRoutes.activities.path} element={<ActivitiesPage />} />
        <Route path={appRoutes.newActivity.path} element={<NewActivityPage />} />
        <Route path={appRoutes.practiceActivitiesNew.path} element={<NewActivityPage />} />
        <Route path={appRoutes.documents.path} element={<DocumentsPage />} />
        <Route path={appRoutes.newDocument.path} element={<NewDocumentPage />} />
        <Route path={appRoutes.documentDetail.path} element={<DocumentDetailPage />} />
        <Route path={appRoutes.practiceDocumentsNew.path} element={<NewDocumentPage />} />
        <Route path={appRoutes.settings.path} element={<SettingsPage />} />
        <Route path="*" element={<Navigate to={appRoutes.dashboard.path} replace />} />
      </Route>
    </Routes>
  </Suspense>
);
