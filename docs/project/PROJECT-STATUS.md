# Project status

## Funzioni completate
- Routing principale centralizzato
- Layout responsive con sidebar e top bar
- Dashboard operativa e interattiva
- Scheda pratica con azioni operative reali
- Gestione clienti
- Gestione pratiche
- Gestione attività
- Gestione documenti
- Calendario operativo
- Design system condiviso

## Funzioni mancanti
- Notifiche operative avanzate
- Permessi e autorizzazioni granulari
- Integrazioni cloud reali
- Reportistica completa
- Persistenza reale su backend esterno
- Test automatici end-to-end

## Rischi
- La persistenza attuale è in-memory e non è ancora adatta a un uso produttivo.
- Alcune funzioni operative richiedono ulteriori regole di workflow e autorizzazione.
- L’espansione del prodotto richiederà una maggiore disciplina di architettura e test.

## Stato architettura
- Struttura Core / Modules / Shared consolidata.
- La specifica master aggiornata è disponibile in [docs/MASTER-SPECIFICATION.md](../MASTER-SPECIFICATION.md).
- Routing e layout centralizzati.
- Il framework è pronto per evoluzioni successive senza modificare la UI di base.

## Stato design
- Design system condiviso già presente e utilizzato nelle principali schermate.
- La coerenza visiva è buona, ma occorre continuare a consolidare i componenti comuni.

## Stato persistenza
- Attualmente basata su provider in-memory.
- La struttura è pronta per l’introduzione di provider reali, ma il passaggio richiederà una pianificazione dedicata.
