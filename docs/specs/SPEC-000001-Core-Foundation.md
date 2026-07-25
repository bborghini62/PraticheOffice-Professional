# SPEC-000001 — Core Foundation

## Obiettivo
Consolidare l’attuale base di PraticheOffice Professional come primo framework ufficiale del progetto.

## Regole
- Non cambiare l’aspetto grafico attuale.
- Non aggiungere funzionalità di business.
- Non rinominare cartelle o file esistenti senza necessità.
- Non aggiungere nuove dipendenze.
- Non modificare package.json salvo errore indispensabile.
- Mantieni React, TypeScript, Vite, Material UI e React Router.
- Tutto il codice deve essere strettamente tipizzato.
- Non usare any salvo necessità documentata.

## Struttura obbligatoria
- src/core/auth
- src/core/config
- src/core/layout
- src/core/router
- src/core/types
- src/modules/dashboard
- src/modules/settings
- src/shared/components
- src/shared/hooks
- src/shared/services
- src/shared/utils

## Attività completate
1. AppRouter gestisce il routing principale e usa il layout condiviso.
2. Le route sono centralizzate in src/core/router/routes.ts.
3. Dashboard e impostazioni vengono caricati tramite React.lazy.
4. MainLayout contiene TopBar, Sidebar e l’area principale con Outlet.
5. Sidebar evidenzia la pagina attiva usando le costanti di routing centralizzate.
6. Il tema Material UI è centralizzato in src/theme/theme.ts.
7. I componenti residui del template Vite e gli import inutilizzati sono stati rimossi.
8. La documentazione di architettura è stata aggiornata.
9. La documentazione di changelog è stata aggiornata.

## Stato finale dell’implementazione
- Il progetto compila correttamente.
- La struttura è organizzata in Core, Modules e Shared.
- Il routing è centralizzato e il layout è responsive.
