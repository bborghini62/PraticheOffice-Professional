# CLOUD-AUDIT-0001 — Verifica utilizzo reale del Persistence Layer

Data audit: 2026-07-27
Ambito: analisi sola lettura (nessuna modifica codice applicativo)

## 1) Stato reale dell'infrastruttura cloud

### Infrastruttura disponibile
- Google Apps Script presente con endpoint `doGet`/`doPost` e routing azioni in `google-apps-script/Code.gs`.
- Google Sheets configurabile e usato lato GAS tramite `Database.gs`.
- Google Drive configurabile lato GAS tramite `Setup.gs` (cartella root, sottocartelle, scope Drive).
- OAuth Google validato lato GAS in `Auth.gs`.

### Stato collegamento frontend-app
- `callGoogleCloud` esiste in `src/core/cloud/googleAppsScriptClient.ts` ma non risulta chiamata da moduli applicativi.
- `GoogleCloudConnectionCard` usa solo:
  - `loadCloudConfig` / `saveCloudConfig` (localStorage)
  - `testGoogleCloudConnection` (GET `action=health`)
- Risultato: infrastruttura cloud pronta lato backend/configurazione, ma non collegata al flusso dati operativo dei moduli.

### Persistence Layer
- `PersistenceFactory` e provider (`InMemory`, `SQLite`, `GoogleDrive`, `Dropbox`) presenti in `src/core/persistence/`.
- `AppBootstrap` inizializza `configService` e `databaseService`, non inizializza/usa `persistenceFactory`.
- `GoogleDrivePersistenceProvider`, `DropboxPersistenceProvider`, `SQLitePersistenceProvider`: placeholder (metodi non implementati, `isAvailable() === false`).
- Default configurazione:
  - `persistence.type = InMemory`
  - `cloud.defaultProvider = local`

Conclusione Fase 1: `PersistenceFactory` non è realmente collegata all'avvio applicazione.

## 2) Mappa flussi per modulo (UI -> service -> repository -> fonte dati)

Nota generale repository: non risultano directory/file repository in `src/**/repositories/**`. I componenti UI chiamano direttamente i service.

### Clienti
1. UI: `ClientsPage`, `ClientDetailPage`, `NewClientPage`.
2. Service: `clientsService` (+ `clientCodeService` per codice).
3. Repository: nessuno.
4. Fonte dati effettiva: localStorage via `loadPersistedArray/savePersistedArray`.
5. Chiave localStorage: `praticheoffice.clients.v1`.
6. Provider cloud usato: nessuno.
7. Chiamate Apps Script eseguite: nessuna.
8. Bypass Persistence Layer: sì, bypass di `PersistenceFactory` (uso diretto localStorage wrapper).

### Pratiche
1. UI: `PracticesPage`, `PracticeDetailPage`, `NewPracticePage`.
2. Service: `practicesService` (+ `practiceCodeService`).
3. Repository: nessuno.
4. Fonte dati effettiva: localStorage via `loadPersistedArray/savePersistedArray`.
5. Chiave localStorage: `praticheoffice.practices.v1`.
6. Provider cloud usato: nessuno.
7. Chiamate Apps Script eseguite: nessuna.
8. Bypass Persistence Layer: sì.

### Attivita
1. UI: `ActivitiesPage`, `NewActivityPage`.
2. Service: `activitiesService` (+ `activityCodeService`).
3. Repository: nessuno.
4. Fonte dati effettiva: array in-memory (`activitiesStore`).
5. Chiave localStorage: assente.
6. Provider cloud usato: nessuno.
7. Chiamate Apps Script eseguite: nessuna.
8. Bypass Persistence Layer: sì (totale, non persistente su refresh).

### Documenti
1. UI: `DocumentsPage`, `DocumentDetailPage`, `NewDocumentPage`.
2. Service: `documentsService`.
3. Repository: nessuno.
4. Fonte dati effettiva: localStorage via `loadPersistedArray/savePersistedArray`.
5. Chiave localStorage: `praticheoffice.documents.v1`.
6. Provider cloud usato: nessuno (campo `provider` solo metadato).
7. Chiamate Apps Script eseguite: nessuna.
8. Bypass Persistence Layer: sì.

### Allegati
1. UI: `AttachmentUploadArea`, `DocumentDetailsTabs` (via `DocumentDetailPage` / `NewDocumentPage`).
2. Service: `documentAttachmentsService`.
3. Repository: nessuno.
4. Fonte dati effettiva:
   - metadati: localStorage
   - binario file: object URL in memoria browser (`URL.createObjectURL`).
5. Chiave localStorage: `praticheoffice.document-attachments.v1`.
6. Provider cloud usato: nessuno (`defaultStorageProvider = browser-memory`).
7. Chiamate Apps Script eseguite: nessuna.
8. Bypass Persistence Layer: sì.

### Timeline
1. UI: usata nei dettagli pratica/workflow e altri moduli.
2. Service: `timelineService`.
3. Repository: nessuno.
4. Fonte dati effettiva: array in-memory (`timelineStore`).
5. Chiave localStorage: assente.
6. Provider cloud usato: nessuno.
7. Chiamate Apps Script eseguite: nessuna.
8. Bypass Persistence Layer: sì.

### Utenti
1. UI: `UsersPage`, `UserDetailPage`, `NewUserPage`.
2. Service: `usersService`.
3. Repository: nessuno.
4. Fonte dati effettiva: localStorage diretto (`window.localStorage`).
5. Chiave localStorage: `praticheoffice-users`.
6. Provider cloud usato: nessuno.
7. Chiamate Apps Script eseguite: nessuna.
8. Bypass Persistence Layer: sì.

### Gruppi
1. UI: `GroupsPage`.
2. Service: `groupsService`.
3. Repository: nessuno.
4. Fonte dati effettiva: array in-memory (`groupsStore`).
5. Chiave localStorage: assente.
6. Provider cloud usato: nessuno.
7. Chiamate Apps Script eseguite: nessuna.
8. Bypass Persistence Layer: sì.

### Workflow
1. UI: `WorkflowPage` (+ `WorkflowDesigner`, `WorkflowHistory`, `WorkflowTransitionDialog`).
2. Service: `workflowService`, `workflowEngine`.
3. Repository: nessuno.
4. Fonte dati effettiva:
   - definizioni workflow: costanti in-memory
   - history transizioni: array in-memory (`transitionHistory`).
5. Chiave localStorage: assente.
6. Provider cloud usato: nessuno.
7. Chiamate Apps Script eseguite: nessuna.
8. Bypass Persistence Layer: sì.

### Calendario
1. UI: `CalendarPage` (+ viste month/week/agenda).
2. Service: `calendarService`.
3. Repository: nessuno.
4. Fonte dati effettiva: derivata runtime da `getPractices()`, `getActivities()`, `getDocuments()`.
5. Chiave localStorage: nessuna dedicata (dipende dalle sorgenti).
6. Provider cloud usato: nessuno.
7. Chiamate Apps Script eseguite: nessuna.
8. Bypass Persistence Layer: sì (nessuna persistenza propria).

## 3) Flusso documenti/allegati e Google Drive

Flusso attuale verificato:

Nuovo documento
-> selezione file (`AttachmentUploadArea`)
-> `addAttachments`
-> validazione estensione/dimensione
-> `URL.createObjectURL(file)`
-> salvataggio metadati attachment su localStorage
-> salvataggio URL blob in `objectUrlStore` in-memory
-> preview (iframe/img su blob URL)
-> download (anchor `href=blob:`)

Verifiche puntuali:
- Il file binario viene caricato su Google Drive oggi: **No**.
- Viene salvato come object URL browser: **Sì** (in memoria runtime).
- `GoogleDrivePersistenceProvider`: **placeholder** (non implementato).
- `documentsService` usa provider cloud: **No**.
- `documentAttachmentsService` usa provider cloud: **No**.
- `driveFileId` e `driveUrl` valorizzati: **No** nel frontend (campi assenti in `DocumentRecord`).
- Azione Apps Script che dovrebbe ricevere upload: **non esiste attualmente** nel router. Per coerenza naming andrebbe introdotta un'azione esplicita area `documents` (es. `documents.upload`/`documents.create`) e relativo handler.
- Parti complete:
  - UI upload/preview/download locale
  - validazione file
  - versioning metadati
  - eventi timeline
- Collegamenti mancanti:
  - invio binario a GAS/Drive
  - persistenza metadati documentali su Sheets lato cloud
  - sincronizzazione `driveFileId`/`driveUrl` nel modello frontend.

## 4) Utilizzo reale Google Sheets

### Azioni GAS disponibili (verificate)
In `routeAction_` (`google-apps-script/Code.gs`) risultano:
- `auth.me`
- `clients.list`
- `clients.create`
- `clients.update`
- `practices.list`
- `practices.create`
- `practices.update`
- `users.createOrUpdate`

### Uso reale dal frontend
- Nessun modulo applicativo invoca `callGoogleCloud`.
- Quindi nessuna entita (`Clienti`, `Pratiche`, `Attivita`, `Documenti`, `Timeline`, `Gruppi`, ecc.) viene oggi letta/scritta realmente su Google Sheets dal frontend.
- Unica chiamata cloud frontend verificata: test health (`action=health`) dalla card impostazioni.

Conclusione Fase 4: Google Sheets e connettore GAS sono pronti, ma non usati dai flussi operativi UI.

## 5) Tabella obbligatoria provider

| Modulo | Servizio attuale | Fonte dati effettiva | Provider previsto | Cloud realmente usato | Problema |
|---|---|---|---|---|---|
| Clienti | `clientsService` | localStorage (`praticheoffice.clients.v1`) | Google Cloud | No | PersistenceFactory non collegata; nessuna call cloud |
| Pratiche | `practicesService` | localStorage (`praticheoffice.practices.v1`) | Google Cloud | No | come sopra |
| Attivita | `activitiesService` | array in-memory | Google Cloud | No | bypass totale persistenza |
| Documenti | `documentsService` | localStorage (`praticheoffice.documents.v1`) | Google Cloud / Drive | No | provider cloud solo metadato, nessuna integrazione reale |
| Allegati | `documentAttachmentsService` | metadata localStorage + blob URL in-memory | Google Drive | No | nessun upload binario; perdita URL su refresh |
| Timeline | `timelineService` | array in-memory | Google Sheets | No | nessuna persistenza |
| Utenti | `usersService` | localStorage (`praticheoffice-users`) | Google Sheets | No | localStorage diretto fuori layer persistenza |
| Gruppi | `groupsService` | array in-memory | Google Sheets | No | nessuna persistenza |
| Workflow | `workflowService`/`workflowEngine` | definizioni + history in-memory | Google Sheets | No | nessuna persistenza |
| Calendario | `calendarService` | vista derivata da pratiche/attivita/documenti | Dipende dalle sorgenti | No | eredita limiti sorgenti non cloud |

## 6) Classificazione criticita

### CRITICO
- `PersistenceFactory` non agganciata al runtime applicativo.
- Nessun modulo business usa `callGoogleCloud` per CRUD operativo.
- Upload allegati verso Google Drive assente (binario non esce dal browser).

### ALTO
- Provider `GoogleDrivePersistenceProvider`, `DropboxPersistenceProvider`, `SQLitePersistenceProvider` non implementati.
- Modello frontend documenti non gestisce `driveFileId`/`driveUrl` pur essendo previsti nello schema cloud.
- Entita chiave (Attivita, Timeline, Gruppi, Workflow) solo in-memory: perdita dati su reload.

### MEDIO
- Utenti persistiti su localStorage diretto (non tramite wrapper comune).
- Config cloud salvata solo per-device (`praticheoffice-google-cloud-config-v1`), non centralizzata.

### BASSO
- Campo `provider` in `DocumentRecord` e `storageProvider` attachment sono informativi ma non governano backend reale.
- Problemi di sola UI: alcune etichette suggeriscono integrazione cloud gia operativa, ma il flusso resta locale.

### Distinzione esplicita richiesta
- Infrastruttura gia pronta: GAS, Sheets, Drive setup, OAuth verification.
- Provider solo predisposto: factory + provider classi cloud/sqlite.
- Collegamento mancante: bootstrap/DI servizi -> provider/cloud client.
- Implementazione reale mancante: metodi provider cloud e upload documenti.
- Configurazione mancante: non bloccante lato infra (config base presente), mancante lato wiring runtime.
- Problema esclusivamente UI: rappresentazione provider senza esecuzione backend.

## 7) Ordine minimo delle correzioni

1. Collegare runtime a un adapter di persistenza reale (factory/strategy) per eliminare bypass locale.
2. Introdurre integrazione cloud nei service core (Clienti/Pratiche prima), usando azioni GAS gia disponibili.
3. Estendere routing GAS per `documents` e `activities` (list/create/update) e timeline/groups/workflow se richiesti.
4. Implementare upload allegati Drive end-to-end (azione GAS dedicata + mapping `driveFileId`/`driveUrl`).
5. Rendere persistenti moduli oggi in-memory (Attivita, Timeline, Gruppi, Workflow).
6. Uniformare Utenti e altri service al medesimo layer di persistenza, eliminando accessi localStorage diretti.

## 8) Criteri di test end-to-end

### Wiring e bootstrap
- Verificare che all'avvio venga inizializzato provider selezionato (non fallback implicito in-memory).
- Verificare che cambio provider/config produca effetti reali sui service.

### Google Sheets
- Clienti: create/update/list da UI con verifica record su foglio `Clienti`.
- Pratiche: create/update/list da UI con verifica su foglio `Pratiche`.
- Utenti: create/update da UI con verifica su foglio `Utenti`.
- Error handling: token invalido, utente non autorizzato, azione sconosciuta.

### Google Drive documenti/allegati
- Upload file da UI produce file reale in Drive.
- Metadati documento/allegato salvano `driveFileId` e `driveUrl`.
- Preview/download funzionano dopo hard refresh e da altra sessione/browser.
- Versioning allegati mantiene storico coerente tra UI, Sheets e Drive.

### Regressione moduli
- Attivita/Timeline/Gruppi/Workflow non devono perdere dati dopo refresh.
- Calendario deve riflettere dati cloud persistiti (non solo stato runtime corrente).

---

## Sintesi conclusiva (stato reale oggi)
- Provider usato oggi da ogni modulo: localStorage o array in-memory; nessun modulo operativo usa provider cloud.
- `PersistenceFactory` realmente collegata: no.
- File caricati realmente su Google Drive: no.
- Record scritti realmente su Google Sheets dal frontend: no.
- Collegamenti mancanti principali: wiring runtime -> persistence/cloud, CRUD cloud moduli, upload Drive, mapping `driveFileId/driveUrl`.
