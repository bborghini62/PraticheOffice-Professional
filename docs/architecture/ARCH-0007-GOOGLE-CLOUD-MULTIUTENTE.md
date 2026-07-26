# ARCH-0007 — Google Cloud multiutente

## Obiettivo

PraticheOffice viene utilizzato da circa dieci persone, anche da sedi e dispositivi diversi, con una bassa probabilità di scritture simultanee. Non è previsto alcun server locale.

## Architettura scelta

- Applicazione React/Vite pubblicabile online.
- Google Apps Script come API cloud.
- Google Sheets come database centrale strutturato.
- Google Drive come archivio documentale.
- Google Identity Services per identificare gli utenti.
- `LockService` per serializzare le scritture concorrenti.
- `localStorage` e IndexedDB soltanto come cache temporanea e recupero offline.

## Sicurezza

- Il backend non accetta l'email dichiarata dal browser.
- Ogni richiesta dati deve includere un Google ID token.
- Apps Script verifica il token presso Google e controlla il relativo Client ID.
- L'email verificata deve essere presente e attiva nel foglio `Utenti`.
- Tutte le scritture vengono registrate nel foglio `AuditLog`.

## Tabelle create

- Utenti
- Clienti
- Pratiche
- Attivita
- Documenti
- Gruppi
- Categorie
- Timeline
- AuditLog

## Fasi successive

1. Login Google reale nell'app.
2. Migrazione servizi Clienti e Pratiche alle API cloud.
3. Upload documenti in Google Drive.
4. Permessi per gruppi e assegnazioni.
5. Cache offline e sincronizzazione controllata.
6. Pubblicazione web e configurazione dispositivi remoti.
