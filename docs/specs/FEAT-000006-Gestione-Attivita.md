# FEAT-000006 — Gestione Attività

## Obiettivo
Creare il modulo Attività e collegarlo alle pratiche, usando il Design System esistente e dati in-memory.

## Requisiti implementati
- Routing dedicato per elenco attività, nuova attività e creazione da scheda pratica.
- Sidebar aggiornata con la voce Attività attiva.
- Elenco attività con ricerca, filtri per stato, priorità, assegnatario e pratica, tabella responsive e stato vuoto.
- Nuova attività con codice automatico, validazione in italiano e salvataggio in-memory.
- Collegamento con le pratiche tramite praticaId e aggiornamento immediato in scheda pratica.
- Dati demo con almeno 10 attività collegate alle pratiche esistenti.

## Stato finale
- Modulo Attività presente in src/modules/activities.
- Routing registrato in AppRouter e routes.
- Design System riutilizzato per layout, filtri, tabella e form.
- Build e lint verificati senza errori.
