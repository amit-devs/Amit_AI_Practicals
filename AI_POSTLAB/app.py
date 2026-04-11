from flask import Flask, render_template, request, jsonify
import time
import random

app = Flask(__name__)

# Simulated Chatbot responses
BOT_RESPONSES = [
    "That's an interesting perspective. Tell me more.",
    "I understand. How does that make you feel?",
    "Fascinating. Connecting the dots, it seems like there are multiple layers to this.",
    "I'm Nova, your AI assistant. How can I help you elevate your workflow today?",
    "Scanning databases... According to my parameters, this is highly optimal.",
    "Could you elaborate on that specific point?",
    "I have analyzed your input. The sentiment seems positive.",
    "Let me process that for a moment... Done. Here's what I recommend: keep going.",
    "As an artificial intelligence, I process data, but I appreciate your human intuition.",
    "Indeed. The confluence of these factors creates a unique scenario."
]

@app.route('/')
def index():
    # Renders the main chat UI
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '').strip()
    
    if not user_message:
        return jsonify({'error': 'Message cannot be empty'}), 400

    # Simulate network/processing delay for a more natural feel
    time.sleep(random.uniform(0.5, 1.5))
    
    # Generate a mock response
    # For a real app, this would integrate with an LLM like OpenAI or Google Gemini
    if "hello" in user_message.lower() or "hi" in user_message.lower():
        reply = "Hello! I am Nova. I'm operating at peak efficiency. How can I assist you today?"
    elif "help" in user_message.lower():
        reply = "I'm here to help. You can ask me anything, and I'll do my best to provide a synthesized response based on my parameters."
    else:
        reply = random.choice(BOT_RESPONSES)
        
    return jsonify({
        'success': True,
        'reply': reply
    })

if __name__ == '__main__':
    # Using port 5001 to avoid conflicting with the SmartFeedback app
    app.run(debug=True, port=5001)
