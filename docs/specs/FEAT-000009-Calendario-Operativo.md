# FEAT-000009 — Calendario operativo

## Obiettivo
Creare un calendario operativo collegato alle pratiche, alle attività e ai documenti, mantenendo il design system esistente e usando i servizi già presenti.

## Requisiti implementati
- rotta /calendario
- voce Calendario nella sidebar
- viste mese, settimana e agenda
- navigazione con Oggi, precedente, successivo e titolo del periodo corrente
- evidenza di eventi scaduti, odierni e urgenti
- filtri per tipo evento, stato, responsabile, gruppo e pratica
- collegamenti alle schede pratica e documento
- azione informativa per le attività
- dati in-memory ottenuti dai servizi esistenti senza duplicazione

## Note di implementazione
- il calendario usa i servizi di pratiche, attività e documenti come fonte unica di verità
- la UI resta coerente con PageContainer, PageTitle, SectionCard, PrimaryButton, SecondaryButton, EmptyState e StatusBadge
- non sono state introdotte dipendenze aggiuntive
