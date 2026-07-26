# Backlog ufficiale

Questo backlog definisce la pianificazione di riferimento per PraticheOffice Professional e organizza il lavoro in Epic, Story, Task, Bug e Tech Debt.

## Convenzioni
- Priorità: Alta, Media, Bassa
- Dipendenze: riferiscono a ID di altri elementi del backlog
- Stato: Backlog, In corso, In revisione, Completato, Bloccato

## Epic

### EPIC-001 — Gestione Clienti
- Tipo: EPIC
- Titolo: Gestione Clienti
- Descrizione: Gestire anagrafiche, contatti, stato e collegamenti operativi con le pratiche.
- Priorità: Alta
- Dipendenze: Nessuna
- Stato: In corso

### EPIC-002 — Gestione Pratiche
- Tipo: EPIC
- Titolo: Gestione Pratiche
- Descrizione: Supportare il ciclo di vita delle pratiche, inclusi stato, priorità, scadenze e documenti correlati.
- Priorità: Alta
- Dipendenze: EPIC-001
- Stato: In corso

### EPIC-003 — Attività
- Tipo: EPIC
- Titolo: Attività
- Descrizione: Coordinare attività operative, assegnazioni e monitoraggio delle scadenze.
- Priorità: Alta
- Dipendenze: EPIC-002
- Stato: In corso

### EPIC-004 — Documenti
- Tipo: EPIC
- Titolo: Documenti
- Descrizione: Gestire documenti, versioni, allegati e accesso contestuale alle pratiche.
- Priorità: Alta
- Dipendenze: EPIC-002
- Stato: In corso

### EPIC-005 — Calendario
- Tipo: EPIC
- Titolo: Calendario
- Descrizione: Fornire una vista operativa degli eventi e delle scadenze su base giornaliera, settimanale e mensile.
- Priorità: Media
- Dipendenze: EPIC-003, EPIC-004
- Stato: Completato

### EPIC-006 — Dashboard
- Tipo: EPIC
- Titolo: Dashboard
- Descrizione: Offrire una panoramica rapida dei principali indicatori operativi.
- Priorità: Media
- Dipendenze: Nessuna
- Stato: Completato

### EPIC-007 — Workflow
- Tipo: EPIC
- Titolo: Workflow
- Descrizione: Definire regole operative, approvazioni e timeline automatizzate.
- Priorità: Media
- Dipendenze: EPIC-002, EPIC-003
- Stato: In corso

### EPIC-008 — Notifiche
- Tipo: EPIC
- Titolo: Notifiche
- Descrizione: Informare l’utente su aggiornamenti, scadenze e azioni da eseguire.
- Priorità: Media
- Dipendenze: EPIC-003, EPIC-007
- Stato: Backlog

### EPIC-009 — Permessi
- Tipo: EPIC
- Titolo: Permessi
- Descrizione: Gestire ruoli, autorizzazioni e visibilità degli oggetti in base al profilo utente.
- Priorità: Media
- Dipendenze: EPIC-001, EPIC-002
- Stato: Backlog

### EPIC-010 — Cloud
- Tipo: EPIC
- Titolo: Cloud
- Descrizione: Preparare integrazioni con servizi cloud per documenti e sincronizzazione.
- Priorità: Media
- Dipendenze: EPIC-004
- Stato: Backlog

### EPIC-011 — Report
- Tipo: EPIC
- Titolo: Report
- Descrizione: Esportare e aggregare dati per analisi operativa e controllo.
- Priorità: Bassa
- Dipendenze: EPIC-002, EPIC-003, EPIC-004
- Stato: Backlog

### EPIC-012 — Amministrazione
- Tipo: EPIC
- Titolo: Amministrazione
- Descrizione: Supportare configurazione, impostazioni e gestione dei parametri aziendali.
- Priorità: Media
- Dipendenze: EPIC-006, EPIC-009
- Stato: In corso

## Story

### STORY-001 — Nuova pratica operativa
- Tipo: STORY
- Titolo: Nuova pratica operativa
- Descrizione: Consentire la creazione di una nuova pratica con campi essenziali e validazione.
- Priorità: Alta
- Dipendenze: EPIC-002
- Stato: Completato

### STORY-002 — Scheda pratica dettagliata
- Tipo: STORY
- Titolo: Scheda pratica dettagliata
- Descrizione: Esporre in modo chiaro stato, clientela, attività, documenti e timeline.
- Priorità: Alta
- Dipendenze: EPIC-002, EPIC-003, EPIC-004
- Stato: Completato

### STORY-003 — Gestione clienti e contatti
- Tipo: STORY
- Titolo: Gestione clienti e contatti
- Descrizione: Consentire l’inserimento e la consultazione di clienti e riferimenti operativi.
- Priorità: Alta
- Dipendenze: EPIC-001
- Stato: Completato

### STORY-004 — Timeline operativa
- Tipo: STORY
- Titolo: Timeline operativa
- Descrizione: Mostrare gli aggiornamenti rilevanti nel tempo per una pratica o un cliente.
- Priorità: Media
- Dipendenze: EPIC-002, EPIC-003, EPIC-004
- Stato: Completato

### STORY-005 — Dashboard operativo
- Tipo: STORY
- Titolo: Dashboard operativo
- Descrizione: Rendere disponibili indicatori chiave per il lavoro quotidiano.
- Priorità: Media
- Dipendenze: EPIC-006
- Stato: Completato

### STORY-006 — Azioni operative dalla scheda pratica
- Tipo: STORY
- Titolo: Azioni operative dalla scheda pratica
- Descrizione: Rendere operative le principali azioni dalla scheda pratica mantenendo il contesto della pratica corrente.
- Priorità: Alta
- Dipendenze: EPIC-002, EPIC-007
- Stato: Completato

## Task

### TASK-001 — Routing principale
- Tipo: TASK
- Titolo: Routing principale
- Descrizione: Centralizzare il routing principale di tutta l’applicazione.
- Priorità: Alta
- Dipendenze: Nessuna
- Stato: Completato

### TASK-002 — Layout responsive
- Tipo: TASK
- Titolo: Layout responsive
- Descrizione: Garantire un layout coerente su desktop e dispositivi mobili.
- Priorità: Alta
- Dipendenze: TASK-001
- Stato: Completato

### TASK-003 — Theme Material UI centralizzato
- Tipo: TASK
- Titolo: Theme Material UI centralizzato
- Descrizione: Mantenere il tema in un unico punto di definizione per la UI.
- Priorità: Media
- Dipendenze: Nessuna
- Stato: Completato

### TASK-004 — Documentazione di architettura
- Tipo: TASK
- Titolo: Documentazione di architettura
- Descrizione: Aggiornare la documentazione tecnica di riferimento.
- Priorità: Media
- Dipendenze: Nessuna
- Stato: Completato

### TASK-005 — Preparazione Beta 0.2
- Tipo: TASK
- Titolo: Preparazione Beta 0.2
- Descrizione: Definire il backlog, la roadmap e gli obiettivi di rilascio per la beta successiva.
- Priorità: Alta
- Dipendenze: Nessuna
- Stato: In corso

## Bug

### BUG-001 — Navigazione da dettaglio pratica a cliente
- Tipo: BUG
- Titolo: Navigazione da dettaglio pratica a cliente
- Descrizione: Verificare la coerenza dei collegamenti tra scheda pratica e scheda cliente.
- Priorità: Media
- Dipendenze: EPIC-002
- Stato: Aperto

### BUG-002 — Stato visualizzato in modo incoerente
- Tipo: BUG
- Titolo: Stato visualizzato in modo incoerente
- Descrizione: Uniformare la visualizzazione di stato e priorità nei componenti condivisi.
- Priorità: Media
- Dipendenze: EPIC-003, EPIC-004
- Stato: Aperto

## Tech Debt

### TECH-001 — Struttura condivisa da consolidare
- Tipo: TECH DEBT
- Titolo: Struttura condivisa da consolidare
- Descrizione: Ridurre la duplicazione nei componenti e nei servizi condivisi in vista della beta.
- Priorità: Media
- Dipendenze: TASK-003
- Stato: In corso

### TECH-002 — Preparazione a persistenza reale
- Tipo: TECH DEBT
- Titolo: Preparazione a persistenza reale
- Descrizione: Separare ulteriormente logica di dominio e provider di persistenza per supportare backend futuri.
- Priorità: Media
- Dipendenze: EPIC-010
- Stato: In corso
