# Moschini S.p.A. — Sito istituzionale

Sito one-page con pannello admin per la gestione contenuti.

## Stack

- **Backend:** Node.js + Express + EJS
- **DB:** SQLite (sql.js)
- **Styling:** Tailwind CSS
- **Immagini:** Sharp (varianti WebP automatiche)

## Setup

```bash
npm install
cp .env.example .env   # poi modifica le variabili
npm run db:seed        # popola DB + genera varianti WebP
npm run dev            # http://localhost:4000
```

## Admin

Pannello: `http://localhost:4000/admin`
Credenziali iniziali: definite in `.env` (`ADMIN_EMAIL`, `ADMIN_PASSWORD`).

## Script disponibili

- `npm run dev` — avvia in development
- `npm start` — avvia in production
- `npm run db:init` — crea tabelle
- `npm run db:seed` — seed iniziale (contenuti base)
- `src/db/seed-full.js` — snapshot completo dei dati correnti (rigenerabile via `src/db/export-seed.js`)
- `npm run css:build` — build Tailwind minificato
- `npm run css:watch` — Tailwind in watch mode

## Deploy

1. `npm install --production`
2. Configura `.env` con valori di produzione (cambia `SESSION_SECRET` e `ADMIN_PASSWORD`)
3. `npm run css:build`
4. `node src/db/seed-full.js` per ripristinare lo snapshot completo
5. `npm start`
