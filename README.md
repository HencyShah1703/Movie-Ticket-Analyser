# Movie Ticket Analyser

An AI-powered Indian movie showtime finder. Enter a movie, city, and date,
and a Groq-hosted LLM generates a realistic set of theatres and showtimes,
rendered in a React UI.

## Project structure

```
.
├── api/
│   └── index.py             # Vercel entrypoint (imports backend/app.py)
├── backend/
│   └── app.py                # Flask API (Groq call, JSON response)
├── requirements.txt          # must stay at project root for Vercel
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── api.js
│       ├── index.css
│       └── components/
│           ├── Header.jsx
│           ├── SearchFilters.jsx
│           ├── TipCard.jsx
│           ├── ResultsBanner.jsx
│           ├── MovieCard.jsx
│           └── StateCard.jsx
├── vercel.json
└── README.md
```

## Local development

**1. Backend (Flask)**

```bash
python -m venv venv && source venv/bin/activate   # optional but recommended
pip install -r requirements.txt
# create backend/.env with: GROQ_API_KEY=your_key_here
python backend/app.py
```

The API runs at `http://127.0.0.1:5000`.

**2. Frontend (React + Vite)**

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173` and proxies `/api/*` requests to the
Flask server on port 5000 (see `vite.config.js`).

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel.
3. Add an environment variable `GROQ_API_KEY` in the Vercel project settings.
4. Vercel auto-detects `api/index.py` as a Python Serverless Function
   (this is why it lives at the project root — Vercel requires that).
   That file just imports the real Flask app from `backend/app.py`, so
   the actual backend logic still stays organized in `backend/`.
5. `vercel.json` builds the frontend via `buildCommand`/`outputDirectory`
   and rewrites all `/api/*` requests to that one function, letting
   Flask's internal routing (`/api/movies`, `/api/health`) handle the rest.

No further configuration is needed — the build and route settings are
already wired up in `vercel.json`.
