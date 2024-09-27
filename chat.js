document.addEventListener('DOMContentLoaded', function() {
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');
    const messagesDiv = document.getElementById('messages');


    function fetchMessages() {
        fetch('fetch_messages.php')
            .then(response => response.json())
            .then(data => {
                messagesDiv.innerHTML = '';
                data.forEach(message => {
                    const messageDiv = document.createElement('div');
                    messageDiv.classList.add('message');
                    messageDiv.innerHTML = `<strong>${message.username}:</strong> ${message.message} <span class="timestamp">${message.created_at}</span>`;
                    messagesDiv.appendChild(messageDiv);
                });
                messagesDiv.scrollTop = messagesDiv.scrollHeight; 
            })
            .catch(error => console.error('Erreur:', error));
    }

  
    messageForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const message = messageInput.value;

        fetch('save_message.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `message=${encodeURIComponent(message)}`,
        })
        .then(response => response.text())
        .then(data => {
            messageInput.value = '';
            fetchMessages(); 
        })
        .catch(error => console.error('Erreur:', error));
    });

    // refresh toute les 2 sec
    setInterval(fetchMessages, 2000);

  
    fetchMessages();
});