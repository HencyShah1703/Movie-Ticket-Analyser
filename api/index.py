"""
Vercel entrypoint.

Vercel's Python runtime auto-detects Serverless Functions only inside a
root-level `/api` directory. All the real backend logic lives in
`backend/app.py` so the codebase stays organized — this file just imports
and re-exports that Flask `app` object so Vercel can find and run it.
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from backend.app import app  # noqa: E402,F401
