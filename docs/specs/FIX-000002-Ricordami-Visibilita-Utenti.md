# FIX-000002 — Ricordami e visibilità Utenti

## Obiettivo
Correggere due problemi del modulo autenticazione senza alterare le altre funzionalità dell’applicazione.

## Modifiche implementate

### 1. Ricordami
- il ripristino della sessione ora viene gestito in modo corretto tra sessionStorage e localStorage;
- con “Ricordami” selezionato, la sessione resta disponibile dopo la chiusura e la riapertura del browser;
- senza “Ricordami”, l’accesso resta limitato allo storage di sessione corrente;
- il logout cancella entrambe le sessioni e il flag di ricordami;
- non viene salvata alcuna password.

### 2. Sidebar e utenti
- la voce “Utenti” viene mostrata solo all’Amministratore;
- per Operatore, Collaboratore e Visualizzatore la voce viene completamente rimossa dalla sidebar senza spazi vuoti o separatori residuali;
- le rotte utenti restano protette e, in caso di accesso diretto non autorizzato, mostrano la pagina “Accesso non consentito”.

## Stato finale
- la build completa correttamente;
- la lint completa correttamente.
