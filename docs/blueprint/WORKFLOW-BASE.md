# Workflow base

## Workflow standard
Bozza
→ Aperta
→ Assegnata
→ In lavorazione
→ In attesa
→ Da controllare
→ Da approvare
→ Approvata
→ Completata
→ Archiviata

## Stati alternativi
- Annullata
- Sospesa
- Respinta
- Da integrare

## Dettaglio per passaggio

### Bozza
- Ruolo autorizzato: Responsabile pratica o Collaboratore con permessi di creazione.
- Controlli obbligatori: compilazione dati base, tipo pratica, responsabile.
- Notifiche: creazione bozza e conferma di salvataggio.
- Attività automatiche: nessuna.
- Documenti richiesti: nessuno o documenti minimi configurabili.
- Dati da registrare nello storico: data di creazione, utente, stato iniziale.

### Aperta
- Ruolo autorizzato: Responsabile pratica.
- Controlli obbligatori: validazione dati, assegnazione responsabile, scadenza.
- Notifiche: notifica di avvio pratica.
- Attività automatiche: assegnazione responsabile.
- Documenti richiesti: eventuali allegati obbligatori.
- Dati da registrare nello storico: data di apertura, utente, responsabile.

### Assegnata
- Ruolo autorizzato: Responsabile pratica o Supervisore.
- Controlli obbligatori: verifica assegnazione e priorità.
- Notifiche: notifica di assegnazione.
- Attività automatiche: creazione attività iniziali.
- Documenti richiesti: documenti base richiesti dal tipo pratica.
- Dati da registrare nello storico: assegnatario, data di assegnazione.

### In lavorazione
- Ruolo autorizzato: Collaboratore o Responsabile pratica.
- Controlli obbligatori: attività pianificate, documenti caricati, stato di avanzamento aggiornata.
- Notifiche: promemoria di lavoro in corso.
- Attività automatiche: promemoria scadenza.
- Documenti richiesti: documenti da completare.
- Dati da registrare nello storico: data di inizio lavoro, utente attore.

### In attesa
- Ruolo autorizzato: Responsabile pratica o Supervisore.
- Controlli obbligatori: motivazione della sospensione, nuova scadenza opzionale.
- Notifiche: comunicazione di attesa.
- Attività automatiche: richiesta di integrazione o aggiornamento.
- Documenti richiesti: documenti mancanti.
- Dati da registrare nello storico: motivo di attesa, utente, data.

### Da controllare
- Ruolo autorizzato: Supervisore.
- Controlli obbligatori: verifica qualità, completezza documentale, coerenza interna.
- Notifiche: richiesta di controllo.
- Attività automatiche: assegnazione del controllo.
- Documenti richiesti: documenti principali e checklist.
- Dati da registrare nello storico: assegnazione al controllo, data.

### Da approvare
- Ruolo autorizzato: Responsabile pratica o Amministratore.
- Controlli obbligatori: verifica finale, firma interna o approvazione.
- Notifiche: richiesta di approvazione.
- Attività automatiche: proposta di chiusura.
- Documenti richiesti: documenti firmati o finalizzati.
- Dati da registrare nello storico: data di approvazione richiesta, utente.

### Approvata
- Ruolo autorizzato: Amministratore o Responsabile pratica.
- Controlli obbligatori: allineamento con il workflow, documentazione completa.
- Notifiche: pratica approvata.
- Attività automatiche: preparazione per completamento.
- Documenti richiesti: documenti finali.
- Dati da registrare nello storico: data di approvazione, utente approvatore.

### Completata
- Ruolo autorizzato: Responsabile pratica o Amministratore.
- Controlli obbligatori: chiusura attività, verifica archiviazione.
- Notifiche: completamento della pratica.
- Attività automatiche: proposta di archiviazione.
- Documenti richiesti: archivio finale.
- Dati da registrare nello storico: data di completamento, utente.

### Archiviata
- Ruolo autorizzato: Amministratore.
- Controlli obbligatori: conservazione definitiva, accesso limitato.
- Notifiche: archiviazione confermata.
- Attività automatiche: archivio finale e chiusura accessi.
- Documenti richiesti: documenti finali e firma di chiusura.
- Dati da registrare nello storico: data di archiviazione, utente.

## Automazioni iniziali
- creazione cartella cloud;
- assegnazione responsabile;
- promemoria scadenza;
- segnalazione ritardo;
- richiesta documenti;
- proposta di chiusura;
- archiviazione finale.
