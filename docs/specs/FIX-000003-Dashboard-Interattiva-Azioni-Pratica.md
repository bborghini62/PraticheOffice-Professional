# FIX-000003 — Dashboard interattiva e azioni pratica

## Obiettivo
Rendere la dashboard realmente operativa e garantire che le azioni principali della scheda pratica restino nel contesto della pratica corrente.

## Requisiti
- Tutti gli elementi operativi della dashboard devono essere cliccabili e portare a una destinazione reale.
- Le sezioni del dashboard non devono cambiare altezza in modo incontrollato quando il contenuto cresce.
- Il pulsante Modifica nella scheda pratica deve aprire una schermata o un dialog di modifica reale.
- Le azioni di workflow, duplicazione, archiviazione, annullamento e copia codice devono essere operative e restare nella scheda pratica corrente.
- Build e lint devono completarsi senza errori o warning.

## Implementazione
- Le card e le righe della dashboard sono state collegate a rotte operative reali: pratiche, attività e documenti.
- I filtri della dashboard restano coerenti con il contesto attivo e consentono navigazione verso viste pertinenti.
- La scheda pratica usa un dialog di modifica reale con salvataggio nello store in-memory e aggiornamento della timeline.
- Le azioni di workflow e le azioni secondarie della scheda pratica sono state collegate a handler operativi che mantengono il contesto della pratica corrente.
- Le sezioni della dashboard sono state rese più stabili con contenitori a altezza fissa e scroll interno.

## Verifica
- Build eseguito con npm run build.
- Lint eseguito con npm run lint.
