from flask import Flask, request, jsonify
from groq import Groq
import markdown
import os

app = Flask(__name__)

# Initialize Groq with the key we will set in Vercel
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

@app.route('/api/movies', methods=['GET'])
def get_movie_info():
    movie_name = request.args.get('movie')
    location = request.args.get('location')
    date_user = request.args.get('date')

    if not movie_name or not location:
        return jsonify({"html": "<p>Please enter movie and city.</p>"})

    try:
        # We use Llama 3.3 70b because it's powerful and free on Groq
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system", 
                    "content": "You are a Movie Agent. Return ONLY a markdown table with columns: Theatre, Language, Time, Price (₹), and Availability. No conversational text."
                },
                {
                    "role": "user", 
                    "content": f"Showtimes for '{movie_name}' in '{location}' on '{date_user}'."
                }
            ]
        )
        
        content = completion.choices[0].message.content
        html_table = markdown.markdown(content, extensions=['tables'])
        return jsonify({"html": html_table})
    
    except Exception as e:
        return jsonify({"html": f"<p>Error: {str(e)}</p>"})

def handler(event, context):
    return app(event, context)