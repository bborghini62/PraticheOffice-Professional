# PraticheOffice Professional — Blueprint V1

## Sottotitolo
Piattaforma professionale per la gestione di pratiche, attività, documenti e gruppi di lavoro.

## Principio guida
“Organizza il lavoro. Non complicarlo.”

## Lingua
- interfaccia utente in italiano;
- codice sorgente in inglese;
- struttura predisposta per traduzioni future.

## Utenti destinatari
- studi professionali;
- uffici tecnici;
- aziende;
- amministrazioni;
- società di servizi;
- organizzazioni con gruppi di lavoro.

## Modalità previste
- Studio: utilizzo locale;
- Azienda: utilizzo multiutente;
- Desktop macOS e Windows;
- Web;
- iPad;
- iPhone e Android in versione operativa semplificata.

## Architettura funzionale
- Core;
- Gestione pratiche;
- Attività;
- Documenti;
- Persone e gruppi;
- Calendario;
- Workflow;
- Notifiche;
- Report;
- Centro configurazione;
- Collegamenti cloud;
- Plugin futuri.

## Ruoli principali
- Amministratore;
- Responsabile pratica;
- Supervisore;
- Collaboratore;
- Lettore;
- Ospite esterno.

### Ruolo: Amministratore
- Cosa può vedere: tutte le pratiche, tutte le attività, tutti i documenti, i registri e le impostazioni di sistema.
- Cosa può modificare: configurazioni, utenti, ruoli, gruppi, workflow, cloud, numerazioni e parametri generali.
- Cosa può approvare: qualsiasi pratica o passaggio di workflow.
- Cosa non può fare: nessuna azione bloccante se non quelle esplicitamente vietate dal framework di sicurezza.

### Ruolo: Responsabile pratica
- Cosa può vedere: pratiche assegnate o gestite, attività del proprio team e documenti relativi.
- Cosa può modificare: dati della pratica, assegnazioni, scadenze, attività e documenti collegati.
- Cosa può approvare: passaggi di workflow assegnati alla propria responsabilità.
- Cosa non può fare: gestire parametri di sistema o configurazioni globali.

### Ruolo: Supervisore
- Cosa può vedere: pratiche del proprio gruppo, report, scadenze e documenti collegati.
- Cosa può modificare: attività, note interne e stato di avanzamento delle pratiche supervise.
- Cosa può approvare: le pratiche che richiedono il proprio controllo.
- Cosa non può fare: gestire utenti, workflow o configurazioni aziendali.

### Ruolo: Collaboratore
- Cosa può vedere: pratiche assegnate, attività personali e documenti a cui è abilitato.
- Cosa può modificare: proprie attività, note interne e allegati pertinenti.
- Cosa può approvare: solo i passaggi previsti per il proprio ruolo e per la pratica.
- Cosa non può fare: creare nuove configurazioni o gestire altri utenti.

### Ruolo: Lettore
- Cosa può vedere: pratiche e documenti autorizzati in lettura.
- Cosa può modificare: nessuna modifica di contenuto o stato.
- Cosa può approvare: nessuna approvazione.
- Cosa non può fare: cambiare assegnazioni, workflow o documenti protetti.

### Ruolo: Ospite esterno
- Cosa può vedere: solo i contenuti condivisi esplicitamente.
- Cosa può modificare: nessuna modifica senza apposita autorizzazione.
- Cosa può approvare: nessuna approvazione.
- Cosa non può fare: accedere ai dati gestionali o ai registri interni.

## Configurazione cloud guidata
1. Scegliere Google Drive o Dropbox.
2. Premere “Collega account”.
3. Accedere nel browser.
4. Autorizzare PraticheOffice.
5. Selezionare la cartella principale.
6. Verificare il collegamento.
7. Salvare la configurazione.

### Modalità semplice
- credenziali OAuth già predisposte;
- nessuna configurazione tecnica richiesta all’utente.

### Modalità aziendale
- progetto Google o app Dropbox dell’azienda;
- procedura guidata interna;
- collegamenti diretti alle console;
- copia automatica dei valori;
- test finale API.

### Stati visualizzati
- Non configurato;
- Configurazione incompleta;
- Collegato;
- Errore autorizzazione;
- Token scaduto;
- Cartella non accessibile.

## Struttura documentale automatica
PraticheOffice/
  Anno/
    Codice pratica - Oggetto/
      01 Documenti ricevuti/
      02 Documenti prodotti/
      03 Comunicazioni/
      04 Documenti firmati/
      05 Archivio/

### Regole
- nomi configurabili;
- creazione automatica;
- cartella collegata alla pratica;
- versioni documento;
- provider cloud;
- storico caricamenti;
- permessi documentali.

## MVP versione 0.1
### Includere
- login;
- utenti e ruoli;
- gruppi di lavoro;
- anagrafica contatti;
- creazione pratica;
- assegnazione;
- stati;
- scadenze;
- attività;
- checklist;
- documenti;
- timeline;
- storico modifiche;
- Google Drive;
- Dropbox;
- dashboard;
- ricerca;
- backup.

### Escludere temporaneamente
- PEC;
- firma digitale;
- fatturazione;
- CRM avanzato;
- protocollo;
- magazzino;
- cantieri;
- marketplace plugin;
- intelligenza artificiale.

## Regole UX
- massimo 9 voci nel menu principale;
- interfaccia in italiano;
- una sola area di lavoro, senza finestre sovrapposte;
- pulsanti principali sempre nella stessa posizione;
- colori di stato coerenti;
- azioni distruttive con conferma;
- ricerca globale sempre disponibile;
- schermate utilizzabili anche su iPad;
- testi chiari e non tecnici;
- messaggi di errore con indicazione della soluzione;
- salvataggio sempre visibile;
- nessuna funzione nascosta senza motivo.

## Criteri di approvazione blueprint
Il Blueprint V1 è approvato quando:
- tutte le schermate principali sono censite;
- ruoli e permessi sono definiti;
- workflow standard è completo;
- configurazione cloud è descritta;
- struttura documentale è definita;
- MVP è delimitato;
- la navigazione è coerente;
- nessuna funzione importante è priva di schermata;
- non sono presenti contraddizioni tra i documenti.
