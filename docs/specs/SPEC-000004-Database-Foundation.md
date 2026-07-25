# SPEC-000004 — Database Foundation

## Obiettivo
Creare il layer database astratto di PraticheOffice Professional senza modificare UI, routing o modelli di dominio.

## Scope
- Definire un adapter database astratto con API base per inizializzazione, chiusura, esecuzione, query e transazioni.
- Fornire un servizio singleton centralizzato per l’accesso al database.
- Implementare un adapter in-memory per sviluppo e test senza dipendenze esterne.
- Integrare l’inizializzazione del database nel bootstrap dell’applicazione mantenendo il caricamento e il fallback esistenti.

## Stato finale
- Struttura database implementata sotto src/core/database.
- Adapter in-memory pronto per sviluppo e test.
- Runtime integrato con inizializzazione controllata e logging centralizzato.
- Build e lint verificati tramite npm run build e npm run lint.
