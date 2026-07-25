# FEAT-000010 — Login e sessione utente

## Obiettivo
Creare il primo sistema di accesso per PraticheOffice Professional con utenti dimostrativi e sessione locale, senza introdurre nuove dipendenze o modificare i layer di dominio, database o persistence.

## Requisiti implementati
- Rotta pubblica /login
- Tutte le altre rotte richiedono autenticazione
- Utenti demo amministratore e operatore
- Login con email, password, mostra/nascondi password, ricorda accesso ed errori in italiano
- Sessione salvata in sessionStorage o localStorage in base a Ricordami
- Ripristino della sessione al riavvio
- Logout completo
- Informazioni utente e logout nella TopBar
- Pulsante Esci nella Sidebar
- Documentazione chiara dell’uso demo e della sicurezza dimostrativa

## Stato finale
- Implementazione completata
- UI completamente in italiano
- Build e lint verificati senza errori o warning
