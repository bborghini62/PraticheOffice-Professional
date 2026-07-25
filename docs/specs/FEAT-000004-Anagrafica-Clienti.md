# FEAT-000004 — Anagrafica Clienti

## Obiettivo
Creare il modulo Clienti con elenco, ricerca, filtri, nuova anagrafica e scheda cliente, utilizzando il design system esistente e dati in-memory.

## Scope
- aggiungere il modulo Clienti alla navigazione principale
- implementare l’elenco clienti con ricerca e filtri
- implementare la creazione di una nuova anagrafica cliente con codice automatico
- implementare la scheda cliente con tab di riepilogo e contenuti demo
- mantenere il nucleo applicativo invariato

## Criteri di accettazione
- l’interfaccia è completamente in italiano
- i nomi di file, componenti e tipi sono in inglese
- il modulo utilizza dati in-memory
- il routing include /clienti, /clienti/nuovo e /clienti/:clientId
- la schermata usa i componenti del design system esistente
- build e lint restano puliti

## Stato finale dell’implementazione
- aggiunta la voce Clienti nella sidebar
- creato il modulo con elenco, filtri, nuovo cliente e scheda cliente
- inseriti dati demo realistici per otto clienti
- implementata la validazione del form in italiano
- aggiunto il changelog della funzionalità
