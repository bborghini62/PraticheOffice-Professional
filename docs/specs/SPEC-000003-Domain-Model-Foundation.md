# SPEC-000003 — Domain Model Foundation

## Obiettivo
Definire il modello di dominio iniziale di PraticheOffice Professional senza alterare UI, routing, runtime o database.

## Scope
- Creare una struttura di modelli TypeScript sotto src/core/domain.
- Definire entità comuni, utenti, ruoli, gruppi, workspace, documenti, workflow, task e pratiche.
- Usare interface per gli oggetti di dominio e type union per stati/priorità.
- Mantenere il modello puro, senza persistenza o metodi di business.

## Requisiti applicati
- EntityId come branded string con creazione tramite createEntityId.
- TimestampedEntity con id, createdAt, updatedAt.
- Stati e priorità dichiarati come union type.
- Tutte le date come stringhe ISO 8601.
- Tutti i riferimenti tra entità usano EntityId.

## Stato finale
- Struttura domain implementata con barrel exports centralizzati.
- Modelli aggiunti per il dominio iniziale senza impatti su UI, routing o runtime.
- Build e lint verificati tramite npm run build e npm run lint.
