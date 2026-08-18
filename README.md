# Movie Ticket Analyser

An AI-powered Indian movie showtime finder. Enter a movie, city, and date,
and a Groq-hosted LLM generates a realistic set of theatres and showtimes,
rendered in a React UI.

## Project structure

```
.
├── backend/
│   ├── api/
│   │   └── index.py        # Flask API (Groq call, JSON response)
│   └── requirements.txt
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
cd backend
python -m venv venv && source venv/bin/activate   # optional but recommended
pip install -r requirements.txt
export GROQ_API_KEY=your_key_here                 # Windows: set GROQ_API_KEY=...
python api/index.py
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
4. Vercel reads `vercel.json`, which builds `backend/api/index.py` as a
   Python serverless function and `frontend/` as a static Vite build, then
   routes `/api/*` to the backend and everything else to the built frontend.

No further configuration is needed — the build and route settings are
already wired up in `vercel.json`.
