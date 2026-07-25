# SPEC-000002 — Core Runtime

## Obiettivo
Creare il runtime applicativo di base di PraticheOffice Professional senza introdurre logica di business e senza modificare l’aspetto grafico esistente.

## Struttura
- src/core/runtime: bootstrap, error boundary, gestione errori globali, provider notifiche e tipi runtime.
- src/core/config: configurazione centralizzata e accesso tipizzato a import.meta.env.
- src/core/logging: logger centralizzato per sviluppo e produzione.
- src/shared/components: componenti condivisi per loading ed errori.

## Responsabilità dei componenti
- AppBootstrap: punto di ingresso del runtime, avvolge router e provider.
- AppErrorBoundary: intercetta errori React non gestiti e mostra un fallback.
- GlobalErrorHandler: registra errori globali da window.onerror e unhandledrejection.
- NotificationProvider: espone notifiche globali tramite Snackbar e Alert.
- Logger: registra messaggi in modo centralizzato e tipizzato.

## Decisioni tecniche
- Nessun state manager aggiuntivo è stato introdotto.
- La configurazione ambiente è accessibile solo tramite il layer core/config.
- Il runtime non contiene logica di business.

## Criteri di accettazione
- L’applicazione si avvia senza modifiche visive rilevanti.
- Gli errori React e globali vengono registrati.
- Le notifiche globali sono disponibili tramite hook condiviso.
- Build e lint completati con successo.

## Stato finale
- Runtime bootstrap, error boundary, logger, configurazione tipizzata e notifiche globali sono implementati.
