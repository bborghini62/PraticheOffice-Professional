# FEAT-000008 — Gestione Documenti

## Obiettivo
Creare il modulo Documenti e collegarlo alle pratiche, usando il Design System esistente e dati in-memory.

## Requisiti implementati
- Routing dedicato per l'elenco documenti, la creazione e la scheda dettaglio.
- Integrazione nella sidebar e nei percorsi di navigazione principale.
- Elenco documenti con ricerca, filtri per stato, categoria, pratica e proprietario, tabella responsive e stato vuoto.
- Creazione documenti con codice automatico, validazione in italiano e salvataggio in-memory.
- Collegamento dei documenti alle pratiche esistenti con apertura diretta dalla scheda pratica.
- Scheda documento con tab riepilogo, versioni, collegamenti e storico.
- Aggiunta di un evento di timeline quando un documento viene creato.
- Dati dimostrativi in-memory con almeno 10 documenti realistici.

## Stato finale
- Il modulo è disponibile in /documenti, /documenti/nuovo e /documenti/:documentId.
- L'accesso dalla scheda pratica è disponibile dalla tab Documenti con pulsante Nuovo documento.
- La timeline riceve l'evento document_added alla registrazione di un documento.
- Build e lint completati senza errori o warning.
