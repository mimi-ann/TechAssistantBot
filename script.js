const chat = document.getElementById('chat');
    const form = document.getElementById('chatForm');
    const userInput = document.getElementById('userInput');

    const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your OpenAI API key

    form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const prompt = userInput.value;
  appendMessage('user', prompt);
  userInput.value = '';

  // Show "typing..." message and store the element
  const thinkingDiv = appendMessage('assistant', 'Typing...', true);

  // Call the OpenAI API
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a professional tech support assistant who helps users troubleshoot tech issues clearly."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    })
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "Sorry, something went wrong.";

  // Replace the "Thinking..." text with the actual reply
  if (thinkingDiv) {
    thinkingDiv.querySelector('.bubble').textContent = reply;
  }
});

function appendMessage(sender, text, isThinking = false) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message ' + sender;

  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = text;

  if (sender === 'assistant') {
    const avatar = document.createElement('img');
    avatar.src = 'assets/chatbot_logo.png';
    avatar.alt = 'Assistant Avatar';
    avatar.className = 'avatar';
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(bubble);
  } else {
    messageDiv.appendChild(bubble);
  }

  document.getElementById('chat').appendChild(messageDiv);
  document.getElementById('chat').scrollTop = document.getElementById('chat').scrollHeight;

  // Return the message bubble div if it's a temporary (thinking) one
  return isThinking ? messageDiv : null;
  bubble.classList.add('typing-dots');  

}





