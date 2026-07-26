# Stability Master Checklist

## 1. Regole di lavoro

- [ ] nessuna nuova funzionalità durante la stabilizzazione;
- [ ] un problema alla volta;
- [ ] prima individuare la causa, poi correggere;
- [ ] build e lint non equivalgono a test funzionale;
- [ ] ogni correzione deve essere verificata nell’app;
- [ ] nessun commit prima della verifica manuale;
- [ ] nessun dato deve esistere soltanto nello state locale;
- [ ] tutte le entità devono usare la fonte dati ufficiale;
- [ ] dopo ogni correzione eseguire test di regressione.

## 2. Stato Git e ambiente

- [ ] Working tree controllato
- [ ] Ultimo commit stabile identificato
- [ ] Applicazione avviata correttamente
- [ ] Console browser senza errori
- [ ] Terminale senza errori runtime
- [ ] localStorage ispezionato
- [ ] Dati demo e dati utente distinti
- [ ] Procedura di reset dati documentata

## 3. Persistenza generale

Verificare:

- [ ] Esiste una sola implementazione ufficiale per ogni repository
- [ ] I repository non vengono ricreati durante la navigazione
- [ ] I dati demo vengono inizializzati solo se lo storage è vuoto
- [ ] Nessun caricamento sovrascrive dati creati dall’utente
- [ ] Gli ID restano invariati dopo salvataggio e refresh
- [ ] Le date vengono serializzate e deserializzate correttamente
- [ ] Gli aggiornamenti modificano il record corretto
- [ ] Le eliminazioni richiedono conferma
- [ ] I dati restano presenti dopo refresh
- [ ] I dati restano presenti dopo chiusura e riapertura dell’app

## 4. Clienti

- [ ] Creazione cliente
- [ ] Salvataggio completato realmente
- [ ] Cliente presente nell’elenco
- [ ] Cliente apribile
- [ ] Modifica cliente persistente
- [ ] Cliente presente dopo refresh
- [ ] Eliminazione con conferma
- [ ] Nessun cliente duplicato
- [ ] Stato vuoto corretto
- [ ] Errori gestiti correttamente

## 5. Relazione Cliente → Pratiche

- [ ] Creare un cliente
- [ ] Creare una pratica associata
- [ ] Aprire la scheda cliente
- [ ] Verificare presenza pratica
- [ ] Codice pratica cliccabile
- [ ] Titolo pratica cliccabile
- [ ] Apertura della pratica corretta
- [ ] ID cliente e pratica coerenti
- [ ] Collegamento presente dopo refresh
- [ ] Nessuna associazione basata solo sul nome
- [ ] Stato vuoto corretto senza pratiche

## 6. Pratiche

- [ ] Creazione pratica
- [ ] Cliente associato correttamente
- [ ] Responsabile persistito
- [ ] Gruppo persistito
- [ ] Stato persistito
- [ ] Priorità persistita
- [ ] Modifica pratica
- [ ] Apertura pratica
- [ ] Pratica presente dopo refresh
- [ ] Eliminazione con conferma
- [ ] Timeline coerente
- [ ] Navigazione avanti/indietro senza perdita dati

## 7. Documenti

Procedura completa:

- [ ] Aprire una pratica
- [ ] Creare un documento
- [ ] Allegare un PDF
- [ ] Salvare il documento
- [ ] Tornare all’elenco pratiche
- [ ] Riaprire la pratica
- [ ] Documento ancora presente
- [ ] Aggiornare il browser
- [ ] Documento ancora presente
- [ ] Aprire il modulo Documenti
- [ ] Documento visibile anche lì
- [ ] Aprire la scheda documento
- [ ] Allegato presente
- [ ] Nome file corretto
- [ ] Tipo file corretto
- [ ] Dimensione corretta
- [ ] Versione corretta
- [ ] Pratica associata corretta
- [ ] Anteprima PDF funzionante
- [ ] Download funzionante
- [ ] Apertura funzionante
- [ ] Rinomina persistente
- [ ] Nuova versione persistente
- [ ] Eliminazione con conferma
- [ ] Timeline aggiornata
- [ ] Nessun documento scompare durante la navigazione

Ripetere i test per:

- [ ] Immagine
- [ ] DOCX
- [ ] XLSX
- [ ] CSV
- [ ] Altro formato non visualizzabile

Per i formati senza anteprima verificare almeno:

- [ ] messaggio chiaro;
- [ ] download disponibile;
- [ ] nessun errore applicativo.

## 8. Attività

- [ ] Creazione attività
- [ ] Collegamento alla pratica
- [ ] Responsabile
- [ ] Scadenza
- [ ] Stato
- [ ] Modifica
- [ ] Completamento
- [ ] Persistenza dopo refresh
- [ ] Timeline aggiornata
- [ ] Apertura dalla pratica

## 9. Utenti e gruppi

- [ ] Creazione utente
- [ ] Modifica utente
- [ ] Ruolo persistito
- [ ] Utente attivo/inattivo
- [ ] Creazione gruppo
- [ ] Rinomina gruppo
- [ ] Membri multipli
- [ ] Aggiunta membro
- [ ] Rimozione membro
- [ ] Gruppo associabile alla pratica
- [ ] Gruppo presente dopo refresh
- [ ] Nessun membro duplicato

## 10. Routing e navigazione

- [ ] Tutti i link interni usano il router React
- [ ] Nessuna route costruita con ID errato
- [ ] Cliente → Pratica
- [ ] Pratica → Cliente
- [ ] Pratica → Documento
- [ ] Documento → Pratica
- [ ] Pratica → Attività
- [ ] Dashboard → Entità
- [ ] Calendario → Attività/Pratica
- [ ] Pulsante indietro coerente
- [ ] URL diretto apre la scheda corretta
- [ ] Refresh su una scheda non genera errore
- [ ] Elemento inesistente mostra un messaggio corretto

## 11. Timeline

- [ ] Creazione cliente
- [ ] Creazione pratica
- [ ] Modifica pratica
- [ ] Creazione attività
- [ ] Completamento attività
- [ ] Creazione documento
- [ ] Nuova versione
- [ ] Rinomina allegato
- [ ] Eliminazione
- [ ] Eventi non duplicati
- [ ] Ordine cronologico corretto
- [ ] Autore corretto

## 12. Dashboard

- [ ] Conteggio clienti corretto
- [ ] Conteggio pratiche corretto
- [ ] Conteggio attività corretto
- [ ] Conteggio documenti corretto
- [ ] Dati aggiornati dopo una creazione
- [ ] Collegamenti cliccabili
- [ ] Filtri funzionanti
- [ ] Nessun dato proveniente da mock separati

## 13. Calendario

- [ ] Attività visibili
- [ ] Date corrette
- [ ] Apertura attività
- [ ] Apertura pratica associata
- [ ] Modifica data persistente
- [ ] Stato aggiornato
- [ ] Nessun evento duplicato

## 14. Errori e messaggi

- [ ] Nessun salvataggio dichiarato prima della persistenza
- [ ] Elemento non trovato
- [ ] Errore di lettura
- [ ] Errore di scrittura
- [ ] Allegato non disponibile
- [ ] File non supportato
- [ ] Conferma eliminazione
- [ ] Nessun errore tecnico incomprensibile mostrato all’utente

## 15. Test dopo ogni correzione

Checklist standard obbligatoria:

- [ ] npm run build
- [ ] npm run lint
- [ ] npm run dev
- [ ] Test del problema corretto
- [ ] Test del flusso precedente
- [ ] Refresh browser
- [ ] Navigazione tra moduli
- [ ] Controllo console browser
- [ ] Controllo persistenza
- [ ] Verifica manuale dell’utente
- [ ] Solo dopo: commit Git

## 16. Registro delle verifiche

| ID | Data | Modulo | Test | Esito | Problema rilevato | Correzione | Verificato da | Commit |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 001 | YYYY-MM-DD | TBD | TBD | TBD | TBD | TBD | TBD | TBD |

## 17. Criteri di uscita dalla milestone Stability

La RELEASE 0.9 può essere considerata completata soltanto quando:

- [ ] Nessuna criticità classificata CRITICA aperta
- [ ] Nessuna criticità classificata ALTA aperta
- [ ] Tutti i flussi Cliente-Pratica funzionano
- [ ] Tutti i flussi Pratica-Documento funzionano
- [ ] Tutti i dati persistono dopo refresh
- [ ] Tutte le entità leggono dalla stessa fonte dati
- [ ] Nessun repository duplicato
- [ ] Nessuna inizializzazione distruttiva
- [ ] Checklist funzionale completata
- [ ] Build e lint superati
- [ ] Test manuale finale approvato

## 18. Risultato verifica STAB-0001

Flusso Cliente → Pratica verificato con il seguente risultato:

- [x] Il problema è stato ricondotto alla mancata navigazione React Router nella lista delle pratiche collegate nella scheda cliente.
- [x] La lista delle pratiche collegate ora usa la route ufficiale della scheda pratica e l’ID persistente della pratica.
- [x] Il codice e il titolo della pratica sono cliccabili e aprono la scheda corretta.
- [x] Il flusso è stato verificato manualmente tramite navigazione locale e refresh.
- [ ] I test di regressione su tutti gli altri moduli sono stati completati solo per il flusso interessato; gli altri punti restano da verificare nella checklist generale.

## 19. Risultato verifica STAB-0002

Persistenza Documento → Pratica verificata con il seguente risultato:

- [x] Aprire una pratica.
- [x] Creare un documento.
- [x] Allegare un PDF.
- [x] Salvare.
- [x] Verificare presenza del documento nella pratica.
- [x] Aprire il modulo Documenti.
- [x] Verificare presenza dello stesso documento nel modulo Documenti.
- [x] Aprire la scheda documento.
- [x] Verificare allegato e metadati (nome file, tipo, versione, pratica associata).
- [x] Aggiornare il browser e verificare nuovamente la presenza del documento.
- [x] Verificare localStorage per repository documenti e allegati.
- [x] Aprire una nuova sessione applicativa (nuova pagina + login) e verificare la persistenza del documento.
- [x] npm run build
- [x] npm run lint
- [x] npm run dev
- [ ] Verifica completa anteprima PDF, download, rinomina, nuova versione, eliminazione con conferma.
- [ ] Verifica completa regressione su attività pratica e timeline completa.

Note operative:

- Verificato: chiavi localStorage `praticheoffice.documents.v1` e `praticheoffice.document-attachments.v1` con record persistiti.
- Verificato: relazione documento-pratica tramite `document.practiceId` coerente con `practice.id`.
