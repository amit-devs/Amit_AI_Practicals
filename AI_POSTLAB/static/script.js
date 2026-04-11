/**
 * NovaChat - Client Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const messagesContainer = document.getElementById('messages-container');
    const typingIndicator = document.getElementById('typing-indicator');
    const chatWindow = document.getElementById('chat-window');

    // Auto-resize textarea
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
        
        // Reset height if empty
        if (this.value.trim() === '') {
            this.style.height = 'auto';
        }
        
        // Enable/disable send button
        sendBtn.disabled = this.value.trim() === '';
    });

    // Handle Enter key (Send on Enter, Newline on Shift+Enter)
    chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Handle Send Button Click
    sendBtn.addEventListener('click', sendMessage);

    // Initial state for send button
    sendBtn.disabled = true;

    async function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        // 1. Add User Message to UI
        appendMessage(text, 'user');
        
        // Clear input and reset height
        chatInput.value = '';
        chatInput.style.height = 'auto';
        sendBtn.disabled = true;

        // 2. Show Typing Indicator
        showTypingIndicator();
        scrollToBottom();

        // 3. Call API
        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: text })
            });

            const data = await response.json();

            // 4. Hide Typing Indicator
            hideTypingIndicator();

            if (data.success) {
                // 5. Add Bot Response to UI with typewriter effect
                appendMessage(data.reply, 'bot', true);
            } else {
                appendMessage("Error: Could not process request.", 'bot');
            }

        } catch (error) {
            console.error("Chat error:", error);
            hideTypingIndicator();
            appendMessage("Connection error. The network seems unstable.", 'bot', false, true);
        }
    }

    function appendMessage(text, sender, typewrite = false, isError = false) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}-message entrance`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'avatar';
        const iconName = sender === 'user' ? 'user' : 'bot';
        avatarDiv.innerHTML = `<i data-lucide="${iconName}"></i>`;

        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'bubble';
        if (isError) bubbleDiv.style.color = '#ff6b6b';

        msgDiv.appendChild(avatarDiv);
        msgDiv.appendChild(bubbleDiv);
        messagesContainer.appendChild(msgDiv);

        // Re-init icons for the new avatar
        lucide.createIcons();

        if (typewrite && sender === 'bot') {
            typeWriter(text, bubbleDiv);
        } else {
            bubbleDiv.innerHTML = `<p>${escapeHTML(text)}</p>`;
        }

        scrollToBottom();
    }

    function showTypingIndicator() {
        typingIndicator.classList.remove('hidden');
    }

    function hideTypingIndicator() {
        typingIndicator.classList.add('hidden');
    }

    function scrollToBottom() {
        chatWindow.scrollTo({
            top: chatWindow.scrollHeight,
            behavior: 'smooth'
        });
    }

    // Typewriter effect function
    function typeWriter(text, element, speed = 15) {
        let i = 0;
        element.innerHTML = '<p></p>';
        const targetP = element.querySelector('p');
        
        function type() {
            if (i < text.length) {
                targetP.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
                // Occasionally scroll to bottom while typing if it's long
                if (i % 20 === 0) scrollToBottom();
            } else {
                scrollToBottom();
            }
        }
        type();
    }

    // Utility to prevent XSS
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
});
