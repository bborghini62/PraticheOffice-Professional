# FIX-000004 — Selezione responsabile e gruppo nella modifica pratica

## Obiettivo
Correggere la finestra di modifica della pratica affinché responsabile e gruppo siano selezionabili da menu a tendina basati sui dati esistenti, con registrazione delle variazioni nella timeline.

## Requisiti
- Il campo Responsabile è stato sostituito con un menu a tendina alimentato da usersService.
- Sono mostrate solo le opzioni relative a utenti con stato Attivo.
- Il campo Gruppo è stato sostituito con un menu a tendina generato dagli utenti esistenti, senza duplicazione di dati.
- La selezione corrente viene preservata e viene mostrata l’opzione Nessun gruppo quando il modello lo consente.
- La modifica del responsabile genera un evento di timeline di tipo practice_assignee_changed.
- La modifica del gruppo genera un evento di timeline di tipo practice_group_changed.
- Gli altri aggiornamenti continuano a usare la logica standard di pratica aggiornata, senza generare eventi duplicati.

## Implementazione
- Il dialog di modifica pratica ora usa componenti Select basati su dati reali invece di campi testuali.
- I valori di responsabile e gruppo vengono salvati coerentemente con il modello di pratica esistente.
- La timeline viene aggiornata solo quando il valore del responsabile o del gruppo cambia effettivamente.
- La build e la lint sono state verificate con successo.
