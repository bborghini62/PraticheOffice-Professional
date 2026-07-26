# STABILIZATION-ROADMAP

## Checklist principale
- Checklist operativa di riferimento: [docs/testing/STABILITY-MASTER-CHECKLIST.md](../testing/STABILITY-MASTER-CHECKLIST.md)
- Obiettivo: trasformare la revisione architetturale in una procedura di verifica e stabilizzazione verificabile durante la milestone RELEASE 0.9 — STABILITY FIRST.

## Sprint 1
- Obiettivo: stabilire il modello di dominio e la struttura di repository condivisi.
- Moduli coinvolti: core, practices, clients, documents, activities, users, groups.
- Rischio: alto, perché richiede una revisione di tutti i servizi esistenti e delle relazioni tra entità.
- Tempo stimato: 1-2 settimane.
- Beneficio: riduzione del disordine architetturale e primo livello di coerenza tra i moduli.

## Sprint 2
- Obiettivo: centralizzare persistenza, storage e bootstrapping di runtime.
- Moduli coinvolti: core/persistence, auth, users, documents, timeline, settings.
- Rischio: medio-alto, perché coinvolge il passaggio da store in-memory a un modello più stabile.
- Tempo stimato: 1 settimana.
- Beneficio: eliminazione delle inconsistenze di stato e maggiore affidabilità operativa.

## Sprint 3
- Obiettivo: standardizzare routing, identificatori e lifecycle delle entità.
- Moduli coinvolti: routing, practices, clients, documents, activities, users, workflow.
- Rischio: medio, perché richiede allineare navigation e id su tutto il prodotto.
- Tempo stimato: 1 settimana.
- Beneficio: riduzione della fragilità e miglior manutenzione del prodotto.

## Sprint 4
- Obiettivo: introdurre robustezza operativa e osservabilità.
- Moduli coinvolti: core/logging, runtime, auth, timeline, documents, practices.
- Rischio: medio, perché tocca aspetti di sicurezza, diagnosi e qualità del prodotto.
- Tempo stimato: 1 settimana.
- Beneficio: base adeguata per un prodotto commerciale e per future integrazioni.

## Sprint 5
- Obiettivo: separare i dati demo da quelli operativi e preparare la transizione al rilascio commerciale.
- Moduli coinvolti: tutti i moduli business, config, persistence, auth.
- Rischio: medio-alto, perché richiede una revisione completa del contenuto iniziale e del modello di ambiente.
- Tempo stimato: 1-2 settimane.
- Beneficio: disponibilità di una base reale, stabile e pronta per evoluzioni sostenibili.

## Verifica STAB-0001
- Stato: verificato per il flusso Cliente → Pratica.
- Risultato: la lista delle pratiche collegate nella scheda cliente ora apre correttamente la scheda della pratica tramite la route ufficiale e l’ID persistente della pratica.
- Nota: la verifica è stata eseguita in ambiente locale e con refresh del browser; altri punti di regressione restano da completare nella checklist generale.

## Verifica STAB-0002
- Stato: verificato per il flusso di persistenza Documento/Allegato collegato alla pratica.
- Risultato: il documento creato in pratica resta disponibile dopo navigazione, refresh e nuova sessione applicativa; il modulo Documenti e la scheda Pratica leggono la stessa fonte persistita.
- Persistenza usata: chiavi localStorage `praticheoffice.documents.v1` e `praticheoffice.document-attachments.v1` tramite `core/persistence/localStorageStore`.
- Nota: restano da completare le verifiche funzionali estese su anteprima/download/rinomina/nuova versione/eliminazione e regressione completa cross-modulo.
