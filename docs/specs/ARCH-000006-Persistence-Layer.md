# ARCH-000006 — Persistence Layer Architecture

## Obiettivo
Creare una struttura di architettura dedicata alla persistenza dei dati senza introdurre SQLite reale, senza cambiare la UI o le funzionalità esistenti.

## Vincoli applicati
- non vengono aggiunte dipendenze esterne
- non viene introdotta alcuna integrazione SQLite reale
- la UI resta invariata
- le funzionalità esistenti non vengono modificate
- non vengono eseguiti commit Git

## Architettura introdotta
- nuova cartella core/persistence con provider, factory, config e status
- interfaccia PersistenceProvider con metodi standardizzati per inizializzazione, shutdown, salvataggio, caricamento, rimozione, pulizia e disponibilità
- provider InMemoryPersistenceProvider come implementazione attiva e compatibile con il modello corrente
- provider stub per SQLite, Google Drive e Dropbox che esistono in compilazione ma non implementano il funzionamento reale
- factory che restituisce il provider corretto in base alla configurazione di persistence.type
- estensione di ConfigService con il nuovo valore di configurazione persistence.type

## Stato attuale
- l’implementazione è architetturale e preparatoria alla futura persistenza reale
- il provider in-memory è disponibile e funzionante
- gli stub esterni sono pronti per futuri sviluppi senza introdurre regressioni
