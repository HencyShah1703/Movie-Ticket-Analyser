import json
import os
import re

from flask import Flask, jsonify, request
from groq import Groq

app = Flask(__name__)

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

SYSTEM_PROMPT = """You are a Movie Showtime Agent for Indian cinemas.
Given a movie name, a city, and a date, respond with ONLY a raw JSON object
(no markdown fences, no commentary, no extra keys) in exactly this shape:

{
  "theatres": [
    {
      "theatre": "string - cinema name",
      "location": "string - short area/locality within the city",
      "language": "string - e.g. Hindi, English, Tamil",
      "showtimes": [
        {"time": "string - e.g. 10:30 AM", "price": number, "availability": "Available | Fast Filling | Sold Out"}
      ]
    }
  ]
}

Return 3 to 5 realistic theatres for the given city, each with 3 to 5 showtimes.
Prices are in INR, numeric only (no currency symbol). Do not include any text
outside of the JSON object."""


def extract_json(raw_text):
    """Pull a JSON object out of the model's reply, stripping any code fences
    or stray text the model may have added despite instructions."""
    cleaned = raw_text.strip()
    cleaned = re.sub(r"^```(json)?", "", cleaned).strip()
    cleaned = re.sub(r"```$", "", cleaned).strip()

    start = cleaned.find("{")
    end = cleaned.rfind("}")
    if start == -1 or end == -1:
        raise ValueError("No JSON object found in model response")

    return json.loads(cleaned[start:end + 1])


@app.route("/api/movies", methods=["GET"])
def get_movie_info():
    movie_name = request.args.get("movie", "").strip()
    location = request.args.get("location", "").strip()
    date_user = request.args.get("date", "").strip()

    if not movie_name or not location:
        return jsonify({"error": "Please enter both a movie name and a city."}), 400

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {
                    "role": "user",
                    "content": f"Showtimes for '{movie_name}' in '{location}'"
                    + (f" on '{date_user}'." if date_user else " today."),
                },
            ],
            temperature=0.4,
        )

        raw_content = completion.choices[0].message.content
        data = extract_json(raw_content)
        theatres = data.get("theatres", [])

        return jsonify(
            {
                "movie": movie_name,
                "location": location,
                "date": date_user or "Today",
                "count": len(theatres),
                "theatres": theatres,
            }
        )

    except Exception as e:
        return jsonify({"error": f"Could not fetch showtimes: {str(e)}"}), 500


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


# Local development only. On Vercel, the `app` object above is imported and
# served directly by the Python runtime, so this block never runs there.
if __name__ == "__main__":
    app.run(debug=True, port=5000)
