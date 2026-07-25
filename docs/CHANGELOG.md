# Changelog

## DESIGN-0001 — Design System - 2026-07-25
- design system ufficiale introdotto
- palette e token centralizzati
- componenti riutilizzabili Material UI
- documentazione design system e linee guida UI

## UX-0003 — Rifinitura Scheda Pratica - 2026-07-25
- rifinitura della scheda pratica con header più compatti
- TopBar contestuale con titolo e sottotitolo della pratica selezionata
- tab multipli per riepilogo, attività, documenti, comunicazioni, scadenze, timeline, storico e permessi
- pannello laterale con contesto operativo più leggibile
- riepilogo dettagliato con dati dimostrativi coerenti

## UX-0002 — Rifinitura Nuova Pratica - 2026-07-25
- TopBar corretta
- valori in italiano
- cliente e contatto
- responsabile e gruppo selezionabili
- tipi pratica predisposti
- descrizione ampliata

## FEAT-0002 — Nuova Pratica - 2026-07-25
- nuova schermata di creazione pratica
- rotta dedicata /pratiche/nuova
- salvataggio in-memory con immediata visualizzazione
- validazione dei campi in italiano
- notifica di successo e ritorno all’elenco

## UX-0001 — Miglioramento schermata Pratiche - 2026-07-25
- interfaccia completamente in italiano
- TopBar contestuale
- Sidebar estesa
- testata pagina migliorata
- filtri riallineati
- tabella più leggibile e interattiva
- miglioramenti responsive

## FEAT-0001 — Elenco Pratiche - 2026-07-25
- nuova sezione Pratiche
- ricerca
- filtri per stato e priorità
- tabella responsive
- dati dimostrativi
- stato vuoto
- azioni predisposte

## DOC-0001 — Blueprint V1 - 2026-07-25
- visione funzionale
- mappa navigazione
- catalogo schermate
- workflow standard
- matrice permessi
- configurazione cloud guidata
- delimitazione MVP

## 0.0.5-alpha - 2026-07-25
- servizio configurazione centralizzato
- valori predefiniti, ambiente e runtime
- configurazione tipizzata
- integrazione con bootstrap applicativo

## 0.0.4-alpha - 2026-07-25
- adapter database astratto
- servizio database centralizzato
- adapter in-memory
- integrazione con il runtime
- predisposizione futura per SQLite ed Electron

## 0.0.3-alpha - 2026-07-25
- modello di dominio iniziale
- utenti e profili
- ruoli e permessi
- gruppi di lavoro
- workspace
- documenti e versioni
- workflow
- attività
- pratiche

## 0.0.2-alpha - 2026-07-25
- bootstrap applicativo
- error boundary
- gestione errori globali
- logger centralizzato
- configurazione tipizzata
- notifiche globali
- componenti di caricamento ed errore

## 0.0.1-alpha - 2026-07-25
- Framework React e TypeScript
- Material UI
- Routing con layout principale
- Dashboard
- Impostazioni
- Struttura Core / Modules / Shared

## [0.1.0] - 2026-07-25
- Reorganized the project into core, modules, and shared layers.
- Added a dedicated router entry point and centralized route configuration.
- Enabled lazy loading for dashboard and settings pages.
- Added project documentation for architecture and changes.
