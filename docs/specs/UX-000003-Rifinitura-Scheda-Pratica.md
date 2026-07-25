# UX-000003 — Rifinitura Scheda Pratica

## Obiettivo
Rifinire la schermata della scheda pratica mantenendo invariata la logica applicativa esistente e utilizzando il design system già presente.

## Scope
- migliorare la testata della scheda pratica
- aggiornare la TopBar con titolo e sottotitolo contestuali alla pratica selezionata
- introdurre una tab bar più completa e navigabile
- rendere il pannello laterale più leggibile e informativo
- mostrare un riepilogo dettagliato con dati dimostrativi coerenti

## Criteri di accettazione
- la schermata mantiene il layout a due colonne
- i pulsanti dell’header sono più compatti e leggibili
- la TopBar non mostra più "Pagina" o "Contenuto in aggiornamento" per la scheda pratica
- le tab includono: Riepilogo, Attività, Documenti, Comunicazioni, Scadenze, Timeline, Storico, Permessi
- il pannello laterale mostra i campi richiesti con dati demo coerenti
- l’implementazione utilizza il design system esistente e non modifica il core, il runtime, il database o il domain model

## Stato finale dell’implementazione
- implementata la rifinitura visuale della scheda pratica
- aggiornata la TopBar per mostrare il titolo e sottotitolo della pratica selezionata
- aggiunte nuove sezioni di contenuto nelle tab
- migliorato il pannello laterale con informazioni operative leggibili
- documentato il cambiamento nel changelog
