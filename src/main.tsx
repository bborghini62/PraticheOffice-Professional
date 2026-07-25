import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AppBootstrap } from './core/runtime';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppBootstrap />
  </StrictMode>,
);
