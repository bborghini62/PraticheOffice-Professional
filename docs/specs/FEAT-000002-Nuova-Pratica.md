# FEAT-000002 — Nuova Pratica

## Obiettivo
Creare la schermata di creazione di una nuova pratica e salvare la nuova pratica nell’archivio in-memory.

## Requisiti implementati
- rotta dedicata /pratiche/nuova;
- pulsante Nuova pratica che apre la nuova schermata;
- form con campi per codice automatico, oggetto, tipo pratica, responsabile, gruppo, priorità, stato iniziale, date e descrizione;
- validazione client-side in italiano;
- salvataggio in-memory con immediata visibilità nell’elenco;
- notifica di successo e ritorno all’elenco dopo il salvataggio.

## Stato finale
La funzionalità è operativa e mantiene l’attuale architettura e il set di dati demo, aggiungendo il flusso completo di creazione pratica.
