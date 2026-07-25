# SPEC-000005 — Configuration Service

## Obiettivo
Creare un servizio centralizzato per la configurazione applicativa senza modificare UI, routing, modelli di dominio o database.

## Scope
- Definire un servizio singleton in core/config con inizializzazione esplicita.
- Separare default, environment e runtime values con priorità runtime > environment > default.
- Riutilizzare il layer environment esistente senza accessi diretti a import.meta.env fuori da core/config.
- Integrare l’inizializzazione del servizio nel bootstrap applicativo prima del database.

## Stato finale
- Servizio configurazione implementato in src/core/config.
- Tipi e configurazioni centralizzati e pronti per future estensioni.
- Build e lint verificati tramite npm run build e npm run lint.
