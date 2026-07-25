# Release 0.1.0-alpha.1

## Nome release
PraticheOffice Professional Alpha 0.1

## Data
2026-07-25

## Obiettivo
Presentare la prima release ufficiale dell’applicazione con un flusso operativo completo per la gestione di pratiche, clienti, attività, documenti e timeline.

## Funzionalità incluse
- gestione pratiche
- gestione clienti
- gestione attività
- gestione documenti
- timeline automatica delle pratiche e delle attività
- layout applicativo condiviso
- design system comune
- integrazione tra moduli senza duplicazione dei dati

## Limiti noti
- i dati sono salvati solo in memoria
- non esiste ancora persistenza reale o autenticazione
- il caricamento documenti è solo illustrativo
- alcune azioni di gestione avanzata sono ancora incomplete

## Procedura di test
1. eseguire l’applicazione in modalità sviluppo
2. verificare il flusso completo di creazione e consultazione di una pratica
3. verificare la creazione di un cliente e il suo collegamento a una pratica
4. verificare la creazione di un’attività collegata alla pratica
5. verificare la creazione di un documento collegato alla pratica
6. verificare l’aggiunta automatica degli eventi di timeline

## Stato build e lint
Da verificare in locale tramite npm run build e npm run lint.

## Persistenza
La release attuale usa un adapter in-memory e non persiste i dati tra riavvii.

## Prossimi passi
- introdurre una persistenza reale
- aggiungere autenticazione e permessi
- migliorare le azioni avanzate sui record
- aggiungere test automatici
