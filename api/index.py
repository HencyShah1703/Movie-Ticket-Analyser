from flask import Flask, request, jsonify
from groq import Groq
import markdown
import os

app = Flask(__name__)

@app.route('/api/movies', methods=['GET'])
def get_movie_info():
    movie_name = request.args.get('movie')
    location = request.args.get('location')
    date_user = request.args.get('date')

    if not movie_name or not location:
        return jsonify({"html": "<p>Please enter movie and city.</p>"})

    # Initialize inside the function to prevent global crash
    api_key = os.environ.get("GROQ_API_KEY")
    if not api_key:
        return jsonify({"html": "<p>Error: API Key missing in Vercel settings.</p>"})

    try:
        client = Groq(api_key=api_key)
        
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": "You are a Movie Agent. Return ONLY a markdown table with columns: Theatre, Language, Time, Price (₹), and Availability."},
                {"role": "user", "content": f"Showtimes for '{movie_name}' in '{location}' on '{date_user}'."}
            ]
        )
        
        content = completion.choices[0].message.content
        html_table = markdown.markdown(content, extensions=['tables'])
        return jsonify({"html": html_table})
    
    except Exception as e:
        # This will now show you the SPECIFIC error on your website
        return jsonify({"html": f"<p>Error during API call: {str(e)}</p>"})

def handler(event, context):
    return app(event, context)