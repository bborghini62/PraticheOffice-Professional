# Catalogo schermate

## SCR-001 — Login
- Scopo: autenticazione dell’utente.
- Utenti autorizzati: tutti gli utenti registrati.
- Contenuti principali: form accesso, recupero password, scelta ambiente.
- Pulsanti principali: Accedi, Recupera password, Entra come ospite.
- Filtri: nessuno.
- Azioni: autentica, reimposta password, cambia ambiente.
- Collegamenti: Dashboard, recupero password.
- Stato vuoto: schermata iniziale con campi vuoti.
- Errori: credenziali errate, account bloccato, servizio non disponibile.

## SCR-002 — Dashboard
- Scopo: panoramica operativa dell’utenza.
- Utenti autorizzati: tutti gli utenti autenticati.
- Contenuti principali: pratiche aperte, pratiche in scadenza, attività personali, attività di gruppo, documenti recenti, notifiche, calendario, pratiche critiche, riepilogo carico di lavoro.
- Pulsanti principali: Apri pratica, Nuova pratica, Visualizza calendario, Apri report.
- Filtri: periodo, utente, gruppo, priorità.
- Azioni: apri pratica, completa attività, aggiorna notifica.
- Collegamenti: Pratiche, Attività, Calendario, Documenti, Report.
- Stato vuoto: messaggio di assenza di dati recenti.
- Errori: dati non disponibili, sincronizzazione incompleta.

## SCR-003 — Elenco pratiche
- Scopo: consultazione e ricerca delle pratiche.
- Utenti autorizzati: utenti con accesso alle pratiche.
- Contenuti principali: tabella, visualizzazione Kanban, visualizzazione calendario, ricerca, filtri, esportazione.
- Pulsanti principali: Nuova pratica, Filtri, Esporta, Apri pratica.
- Filtri: stato, assegnatario, gruppo, periodo, priorità, tipo pratica.
- Azioni: crea, cerca, filtra, esporta, apre scheda.
- Collegamenti: Nuova pratica, Scheda pratica, Dashboard, Report.
- Stato vuoto: nessuna pratica trovata.
- Errori: filtro non valido, esportazione fallita, errore di caricamento.

## SCR-004 — Nuova pratica
- Scopo: creare una nuova pratica.
- Utenti autorizzati: utenti abilitati alla creazione.
- Contenuti principali: dati anagrafici, descrizione, tipo, responsabile, scadenza, allegati iniziali.
- Pulsanti principali: Salva bozza, Avvia pratica, Annulla.
- Filtri: nessuno.
- Azioni: salva, valida, avvia workflow.
- Collegamenti: Elenco pratiche, Scheda pratica.
- Stato vuoto: form vuoto con campi obbligatori evidenziati.
- Errori: dati mancanti, responsabile non valido, errore di salvataggio.

## SCR-005 — Scheda pratica
- Scopo: dettaglio completo della pratica.
- Utenti autorizzati: utenti autorizzati alla pratica.
- Contenuti principali: riepilogo, attività, documenti, comunicazioni, scadenze, timeline, collegamenti, storico, permessi.
- Pulsanti principali: Modifica, Assegna, Cambia stato, Aggiungi attività, Carica documento, Approva.
- Filtri: timeline, tipo documento, stato attività.
- Azioni: aggiorna, assegna, approva, carica, commenta.
- Collegamenti: Elenco pratiche, Attività, Documenti, Calendario, Report.
- Stato vuoto: pratica presente ma senza documenti o attività.
- Errori: accesso non autorizzato, stato non valido, documento non caricato.

## SCR-006 — Attività
- Scopo: gestione delle attività personali e di gruppo.
- Utenti autorizzati: collaboratori, supervisori, responsabili, amministratori.
- Contenuti principali: elenco attività, priorità, scadenze, assegnatari, stato.
- Pulsanti principali: Nuova attività, Filtra, Completa, Riassegna.
- Filtri: stato, assegnatario, data, pratica.
- Azioni: crea, modifica, completa, sposta, notifica.
- Collegamenti: Scheda pratica, Dashboard, Calendario.
- Stato vuoto: nessuna attività da visualizzare.
- Errori: assegnatario non trovato, scadenza non valida.

## SCR-007 — Calendario
- Scopo: pianificazione e visualizzazione degli impegni.
- Utenti autorizzati: utenti autenticati.
- Contenuti principali: vista mese, settimana, giorno, eventi e scadenze.
- Pulsanti principali: Nuovo evento, Oggi, Cambia vista.
- Filtri: utente, gruppo, pratica.
- Azioni: crea evento, sposta, modifica, elimina.
- Collegamenti: Attività, Dashboard, Scheda pratica.
- Stato vuoto: nessun evento nel periodo selezionato.
- Errori: calendario non disponibile, errore di salvataggio evento.

## SCR-008 — Documenti
- Scopo: gestione documentale condivisa.
- Utenti autorizzati: utenti con accesso ai documenti.
- Contenuti principali: elenco documenti, versioni, provider cloud, stato caricamento, permessi.
- Pulsanti principali: Carica, Nuova cartella, Scarica, Versiona.
- Filtri: pratica, tipo, utente, provider, stato.
- Azioni: carica, scarica, rinomina, elimina, versione.
- Collegamenti: Scheda pratica, Cloud, Dashboard.
- Stato vuoto: nessun documento presente.
- Errori: upload fallito, permesso negato, provider non disponibile.

## SCR-009 — Persone
- Scopo: consultazione e gestione anagrafica delle persone coinvolte.
- Utenti autorizzati: amministratori, responsabili, supervisori.
- Contenuti principali: utenti, contatti, organizzazione, gruppi, ruoli.
- Pulsanti principali: Nuovo utente, Nuovo gruppo, Nuovo contatto.
- Filtri: ruolo, gruppo, stato, organizzazione.
- Azioni: aggiungi, modifica, assegna, disabilita.
- Collegamenti: Gruppi, Ruoli, Centro configurazione.
- Stato vuoto: nessuna persona presente.
- Errori: dati incompleti, permesso negato.

## SCR-010 — Gruppi di lavoro
- Scopo: organizzare utenti e responsabilità in gruppi.
- Utenti autorizzati: amministratori e responsabili.
- Contenuti principali: elenco gruppi, membri, responsabili, competenze, pratiche associate.
- Pulsanti principali: Nuovo gruppo, Aggiungi membro, Modifica gruppo.
- Filtri: organizzazione, stato, area.
- Azioni: crea, modifica, assegna, rimuovi membro.
- Collegamenti: Persone, Scheda pratica, Centro configurazione.
- Stato vuoto: nessun gruppo presente.
- Errori: membro non trovato, gruppo già esistente.

## SCR-011 — Report
- Scopo: rendicontazione operativa e monitoraggio.
- Utenti autorizzati: amministratori, responsabili, supervisori.
- Contenuti principali: report pratiche, attività, scadenze, carico lavoro, KPI.
- Pulsanti principali: Esporta, Aggiorna, Filtra.
- Filtri: periodo, gruppo, utente, tipo pratica.
- Azioni: visualizza, esporta, confronta.
- Collegamenti: Dashboard, Pratiche, Attività.
- Stato vuoto: nessun dato disponibile per i filtri selezionati.
- Errori: report non disponibile, dati incompleti.

## SCR-012 — Impostazioni personali
- Scopo: gestire il profilo e le preferenze dell’utente.
- Utenti autorizzati: tutti gli utenti autenticati.
- Contenuti principali: profilo, password, preferenze, notifiche, aspetto.
- Pulsanti principali: Salva, Modifica password.
- Filtri: nessuno.
- Azioni: modifica dati, cambia password, aggiorna preferenze.
- Collegamenti: Dashboard, Impostazioni, Centro configurazione (se amministratore).
- Stato vuoto: profilo compilato con campi vuoti se non disponibili.
- Errori: password non conforme, email già usata, salvataggio fallito.

## SCR-013 — Centro configurazione
- Scopo: gestire i parametri di sistema e operativi.
- Utenti autorizzati: amministratori.
- Contenuti principali: organizzazione, utenti e ruoli, gruppi, numerazioni, tipi di pratica, workflow, documenti, cloud, backup, sicurezza, API, plugin, registro attività.
- Pulsanti principali: Salva, Applica, Esporta, Aggiorna.
- Filtri: categoria, ambiente.
- Azioni: modifica, attiva, disattiva, testa connessione.
- Collegamenti: Impostazioni, Cloud, Workflow, Report.
- Stato vuoto: nessun elemento configurato.
- Errori: configurazione non valida, connessione fallita.

## SCR-014 — Configurazione cloud
- Scopo: scegliere provider cloud e impostare il collegamento.
- Utenti autorizzati: amministratori.
- Contenuti principali: provider disponibili, stato collegamento, cartella principale, test connessione.
- Pulsanti principali: Collega account, Disconnetti, Salva.
- Filtri: provider.
- Azioni: collega, verifica, aggiorna, scollega.
- Collegamenti: Google Drive, Dropbox, Centro configurazione.
- Stato vuoto: nessun provider configurato.
- Errori: autorizzazione scaduta, cartella non accessibile, credenziali non valide.

## SCR-015 — Configurazione Google Drive
- Scopo: collegare Google Drive.
- Utenti autorizzati: amministratori.
- Contenuti principali: autorizzazione OAuth, cartella principale, stato collegamento, test API.
- Pulsanti principali: Collega account, Rinnova accesso, Salva.
- Filtri: nessuno.
- Azioni: autorizza, verifica, salva.
- Collegamenti: Configurazione cloud, Centro configurazione.
- Stato vuoto: non collegato.
- Errori: errore autorizzazione, token scaduto, cartella non accessibile.

## SCR-016 — Configurazione Dropbox
- Scopo: collegare Dropbox.
- Utenti autorizzati: amministratori.
- Contenuti principali: autorizzazione OAuth, cartella principale, stato collegamento, test API.
- Pulsanti principali: Collega account, Rinnova accesso, Salva.
- Filtri: nessuno.
- Azioni: autorizza, verifica, salva.
- Collegamenti: Configurazione cloud, Centro configurazione.
- Stato vuoto: non collegato.
- Errori: errore autorizzazione, token scaduto, cartella non accessibile.

## SCR-017 — Tipi di pratica
- Scopo: definire i modelli di pratica e i relativi campi.
- Utenti autorizzati: amministratori.
- Contenuti principali: tipi di pratica, campi obbligatori, workflow associato, numerazione.
- Pulsanti principali: Nuovo tipo, Modifica, Elimina.
- Filtri: categoria, workflow, attivo.
- Azioni: crea, modifica, elimina, associa workflow.
- Collegamenti: Workflow, Centro configurazione.
- Stato vuoto: nessun tipo configurato.
- Errori: configurazione incoerente, workflow non associato.

## SCR-018 — Designer workflow
- Scopo: modellare i workflow di pratica.
- Utenti autorizzati: amministratori.
- Contenuti principali: fasi, transizioni, regole, notifiche, documenti richiesti.
- Pulsanti principali: Salva workflow, Aggiungi fase, Aggiungi transizione.
- Filtri: workflow, stato.
- Azioni: crea, modifica, ordina, testa.
- Collegamenti: Tipi di pratica, Centro configurazione.
- Stato vuoto: workflow vuoto.
- Errori: transizione non valida, fase incompleta.

## SCR-019 — Utenti e ruoli
- Scopo: gestire profili e autorizzazioni.
- Utenti autorizzati: amministratori.
- Contenuti principali: utenti, ruoli, permessi, gruppi di appartenenza.
- Pulsanti principali: Nuovo utente, Nuovo ruolo, Assegna ruolo.
- Filtri: ruolo, gruppo, stato.
- Azioni: crea, modifica, assegna, disabilita.
- Collegamenti: Persone, Centro configurazione, Gruppi.
- Stato vuoto: nessun utente o ruolo configurato.
- Errori: permesso insufficiente, ruolo duplicato.

## SCR-020 — Registro attività
- Scopo: consultare la cronologia delle operazioni sensibili.
- Utenti autorizzati: amministratori, responsabili, supervisori su base autorizzativa.
- Contenuti principali: eventi, utente, timestamp, oggetto, azione, dettaglio.
- Pulsanti principali: Filtra, Esporta, Aggiorna.
- Filtri: utente, pratica, data, tipo evento.
- Azioni: cerca, filtra, esporta.
- Collegamenti: Centro configurazione, Scheda pratica, Report.
- Stato vuoto: nessun evento registrato.
- Errori: log non disponibile, accesso non autorizzato.
