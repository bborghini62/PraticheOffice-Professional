# ARCHITECTURE-REVIEW-0001

## 1. Architettura attuale

### Vista generale
Il progetto presenta una base React + TypeScript + Vite + Material UI con un’architettura a moduli ben separata a livello di cartelle, ma ancora basata su un modello demo in-memory e su servizi locali piuttosto che su un vero layer di dominio e repository condiviso.

### Struttura attuale
- Core
  - routing: AppRouter e routes.ts
  - layout: MainLayout, TopBar, Sidebar
  - runtime: bootstrap, notification provider, auth provider, error boundary
  - persistence/database/config: servizi di configurazione e infrastruttura di persistenza, attualmente non integrati pienamente con i moduli business
- Modules
  - auth, activities, calendar, clients, dashboard, documents, groups, practices, settings, timeline, users, workflow
  - ogni modulo contiene page, componenti, servizi e tipologie locali
- Shared
  - componenti UI riusabili, hook di layout responsive, utility, servizi generici

### Comportamento runtime
- L’app parte tramite AppBootstrap, che inizializza configurazione, database e provider di runtime.
- Il routing principale è gestito da AppRouter con lazy loading delle pagine.
- Il layout principale è garantito da MainLayout, con TopBar, Sidebar e Outlet.
- L’autenticazione è gestita tramite AuthProvider + authService.
- Le notifiche sono gestite tramite NotificationProvider.

### Persistenza e stato
- La maggior parte dei dati è mantenuta in memoria tramite array locali e variabili module-scoped.
- Gli utenti usano localStorage in modo diretto attraverso usersService.
- L’autenticazione usa localStorage/sessionStorage in modo esplicito e non centralizzato.
- I documenti e gli allegati usano store indipendenti, con relazioni non modellate come entità di dominio condivise.
- La persistenza di livello core esiste come infrastruttura, ma non è ancora la fonte di verità per i moduli business.

### Navigazione
- Le route sono centralizzate in routes.ts, ma in diversi componenti si continuano a usare stringhe hard-coded per navigazione.
- La navigazione dipende da parametri come practiceId o documentId, ma non esiste un layer di routing/domain che garantisca coerenza e validazione.

---

## 2. Mappa completa delle entità

### Cliente
- Dove nasce
  - Seed iniziale in clientsService.
  - Creazione tramite NewClientPage -> addClient.
- Dove viene salvato
  - In memoria in clientsStore all’interno di clientsService.
- Chi lo legge
  - ClientsPage, ClientDetailPage, PracticeDetailPage, PracticeDetailsTabs, Dashboard, componenti di filtro e tab.
- Chi lo modifica
  - Attualmente non esiste una flow di modifica completa dedicata; il dato è aggiornabile solo indirettamente tramite il servizio e da pagine di dettaglio che lo ricaricano da stato locale.
- Chi lo cancella
  - Non esiste un meccanismo di cancellazione reale nel layer attuale; il modello è orientato a stato e visualizzazione, non a lifecycle di eliminazione persistente.

### Pratica
- Dove nasce
  - Seed iniziale in practicesService.
  - Creazione tramite NewPracticePage -> addPractice.
- Dove viene salvato
  - In memoria in practicesStore all’interno di practicesService.
- Chi lo legge
  - PracticesPage, PracticeDetailPage, PracticeDetailsTabs, Dashboard, workflow, activities, documents, calendar.
- Chi lo modifica
  - PracticeDetailPage tramite updatePractice e flow di stato/duplicazione/archiviazione/cancellazione logica.
  - EditPracticeDialog aggiorna lo stato locale del componente prima di propagare la modifica al servizio.
- Chi lo cancella
  - Non esiste una cancellazione reale; viene usato un pattern di archiviazione/annullamento via cambio di stato e timeline.

### Documento
- Dove nasce
  - Seed iniziale in documentsService.
  - Creazione tramite NewDocumentPage -> addDocument.
- Dove viene salvato
  - In memoria in documentsStore.
  - Allegati in attachmentStore separata in documentAttachmentsService.
- Chi lo legge
  - DocumentsPage, DocumentDetailPage, PracticeDetailsTabs, Dashboard, Calendar, timeline.
- Chi lo modifica
  - DocumentDetailPage per rename, archive, delete, upload e versioning.
  - documentAttachmentsService per allegati e versioni.
- Chi lo cancella
  - deleteDocument in documentsService, ma il flusso non è centralizzato con il resto del ciclo di vita del dominio e richiede un context manuale come owner/practiceId.

### Attività
- Dove nasce
  - Seed iniziale in activitiesService.
  - Creazione tramite NewActivityPage -> addActivity.
- Dove viene salvato
  - In memoria in activitiesStore.
- Chi lo legge
  - ActivitiesPage, PracticeDetailsTabs, Dashboard, calendar, workflow.
- Chi lo modifica
  - updateActivityStatus e operazioni di completamento/annullamento.
- Chi lo cancella
  - Non esiste un’operazione di cancellazione reale; lo stato viene modificato e tracciato in timeline.

### Utente
- Dove nasce
  - Seed iniziale in usersService.
  - Creazione tramite NewUserPage -> createUser.
- Dove viene salvato
  - In memoria in usersStore, con persistenza in localStorage tramite usersService.
- Chi lo legge
  - UsersPage, UserDetailPage, AuthProvider, authService, sidebar, dashboard, groups, activities, practices.
- Chi lo modifica
  - updateUser e form di creazione/modifica.
- Chi lo cancella
  - Non esiste una cancellazione reale; il modello è orientato a stato attivo/sospeso/disabilitato.

### Gruppi
- Dove nasce
  - Seed iniziale in groupsService.
  - Creazione tramite GroupFormDialog/GroupsPage.
- Dove viene salvato
  - In memoria in groupsStore.
- Chi lo legge
  - GroupsPage, users, practices, sidebar (per visibilità amministrativa).
- Chi lo modifica
  - updateGroup e operazioni di archivazione/riattivazione.
- Chi lo cancella
  - Non esiste una cancellazione reale; lo stato viene modificato e il gruppo può essere archiviato.

---

## 3. Criticità trovate

### CRITICA

1. Assenza di un repository unico e condiviso
   - Le entità sono sparse tra servizi locali, store module-scoped e storage browser.
   - Non esiste una fonte di verità canonica che tutti i moduli possano condividere.
   - Conseguenza: divergenza di dati e difficoltà di test e manutenzione.

2. Persistenza mista e non coerente
   - Alcuni dati sono in memoria, altri in localStorage, altri in store transienti.
   - Non esiste un contratto esplicito di sincronizzazione, versioning o invalidazione.
   - Conseguenza: il comportamento cambia in base al contesto di esecuzione e al reload della pagina.

3. Relazioni di dominio non modellate in modo stabile
   - Pratiche, documenti, attività, gruppi e utenti sono collegati, ma il modello attuale non espone una relazione canonica e persistita.
   - Gli allegati dei documenti sono gestiti come entità indipendenti, ma il documento non possiede un lifecycle di dipendenze chiaro.
   - Conseguenza: rischio di inconsistenze e operazioni parziali.

### ALTA

4. I servizi business sono ancora “service store” e non repository/domain services
   - I servizi modulare manipolano direttamente array interni e in alcuni casi mutano oggetti in place.
   - Questo rende il comportamento difficile da reason about e fragile in presenza di aggiornamenti concorrenti.

5. Dati demo e mock vengono trattati come dati reali
   - Le seed sono utilizzate come contenuto operativo, non come input iniziale isolato.
   - Ciò è accettabile in fase demo, ma non per una base commerciale.
   - Conseguenza: la linea tra ambiente di test e ambiente operativo è assente.

6. Navigazione e routing parzialmente incoerenti
   - Esistono route centralizzate, ma molte componenti utilizzano stringhe hard-coded o interpolazioni manuali.
   - Non esiste una policy unificata per il naming delle route e l’uso dei parametri.
   - Conseguenza: maggiore fragilità e ridotta manutenibilità.

7. Identità e chiavi non uniformi
   - Alcuni entity id sono basati su codice leggibile, altri su identificatori tecnici o stringhe generate in runtime.
   - La coerenza fra id business, id tecnico e id di route non è garantita.
   - Conseguenza: rischio di conflitti e ambiguità.

### MEDIA

8. Uso di stato locale che bypassa il layer di dominio
   - Alcune pagine mantengono stato locale e poi invocano servizi, senza una singola origine di verità condivisa.
   - Esempi: form dialog, pagine dettaglio, selezioni temporanee di tab e filtri.
   - Conseguenza: il UI può divergere dalla realtà del dominio.

9. Inizializzazione multipla e non controllata
   - ConfigService, DatabaseService, AuthProvider e servizi di modulo si inizializzano in modo indipendente.
   - Non esiste un bootstrapping orchestrato che garantisca ordine, idempotenza e stato globale.

10. Infrastruttura di persistenza core non usata dai moduli
   - PersistenceFactory, DatabaseService e provider di persistence esistono, ma il dominio continua a usare in-memory stores.
   - Conseguenza: il layer core è “fantasma” e non aiuta l’architettura reale.

11. Dipendenze tra moduli troppo dirette
   - Servizi come practicesService importano timeline, clients, documents o workflow, e viceversa.
   - Questo crea un accoppiamento orizzontale che può diventare difficile da gestire quando il dominio cresce.

### BASSA

12. Codice morto e infrastruttura non ancora utilizzata
   - Esistono componenti e servizi che sembrano preparatori ma non sono ancora usati in modo produttivo.
   - Conseguenza: aumento del rumore architetturale e del costo di comprensione.

13. Livello di logging e osservabilità non ancora centralizzato
   - Il logging esiste, ma non è ancora un elemento di runtime condiviso per la diagnostica delle operazioni di dominio.

---

## 4. Impatto sul prodotto

L’attuale architettura è sufficiente per una demo e per validare il flusso applicativo, ma non è ancora adatta a un prodotto commerciale stabile.

### Impatti concreti
- Difficoltà di evoluzione del modello dati senza introdurre regressioni.
- Rischio di perdita o incoerenza dei dati in caso di refresh o navigazione multipla.
- Difficoltà nell’integrare nuovi moduli e nuovi workflow senza creare accoppiamenti fragili.
- Maggiore costi di test, onboarding e manutenzione.
- Difficoltà di introdurre permessi, audit, sincronizzazione, integrazioni reali o persistence multi-utente.

---

## 5. Strategia consigliata

### Obiettivo generale
Trasformare il progetto da una collezione di servizi demo a una piattaforma con:
- una fonte di verità unica;
- un dominio chiaro e stabile;
- un layer di repository/persistence coerente;
- una navigazione e un modello di stato robusti;
- un bootstrapping orchestrato e prevedibile.

### Linee guida
1. Definire un modello di dominio comune.
2. Separare repository, use case e UI.
3. Centralizzare persistence e storage.
4. Eliminare il mixing tra seed demo e dati operativi.
5. Introduzione di un sistema di stato condiviso per entità e relazioni.
6. Standardizzare route, id, lifecycle e permessi.

### Principi architetturali consigliati
- Repository come punto di accesso ai dati.
- Servizi business come orchestratori di casi d’uso.
- UI come layer di presentazione e input.
- Nessun modulo deve accedere direttamente a più fonti di stato senza un contratto condiviso.
- Ogni entità deve avere un lifecycle chiaro: create, read, update, archive/delete.

---

## 6. Ordine corretto delle correzioni

1. Stabilire il modello di dominio e la lista delle entità canoniche
   - Cliente, pratica, documento, attività, utente, gruppo.
   - Definire proprietà, relazioni e lifecycle.

2. Definire il layer repository e il contratto di persistenza
   - Repository condivisi per ogni entità.
   - Separazione netta fra storage in-memory, storage browser e futuri backend.

3. Centralizzare la persistenza e lo storage
   - Sostituire l’uso diretto di localStorage nei moduli con un servizio di storage centralizzato.
   - Garantire versioning e inizializzazione controllata.

4. Riorganizzare i servizi business
   - I servizi non devono più contenere solo state store in-memory, ma implementare operazioni domain coerenti.

5. Standardizzare routing e identificatori
   - Uniformare id, parametri di route e navigazione.
   - Avere un unico provider di route e helper di navigazione.

6. Introduzione di un bootstrapping di runtime coerente
   - Config, auth, persistence e runtime providers devono essere avviati secondo un ordine definito.

7. Aggiungere robustezza operativa
   - logging, error handling, audit, ambito utente e validazione delle relazioni.

8. Preparare la transizione dalla demo al prodotto commerciale
   - Separare seed demo da dati operativi.
   - Definire il modello di ambiente, configurazione e sicurezza.
