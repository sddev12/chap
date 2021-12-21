const socket = io()

const inputBox = document.getElementById('chapInput')
const sendButton = document.getElementById('chapSendButton')
const chatWindow = document.getElementById('chatWindow')

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const user = urlParams.get('user')

inputBox.focus()

// send message on button click
sendButton.addEventListener('click', () => {
    sendMessage()
})

// send message on enter key pressed if message input is focused
inputBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage()
    }
})

// receive message
socket.on('chat-message', payload => {
    appendMessage(payload)

chatWindow.scrollTop = chatWindow.scrollHeight
})


function sendMessage () {
        // get message
        var message = inputBox.value
        // create payload
        const payload = {user: user, message: message}
        // send message
        socket.emit('chat-message', payload)
        // set input to nothing
        inputBox.value = ''
        // scroll to bottom of chat window
        chatWindow.scrollTop = chatWindow.scrollHeight
        // bring message input back to focus
        inputBox.focus()
}


function appendMessage (payload) {
    const messageElement = document.createElement('div')
    messageElement.classList.add('msg-box', 'p-2', 'mb-2')
    messageElement.innerHTML = `
    <p class="msg-username mb-1">${payload.user}<span class="msg-time"> ${payload.time}</span></p>
    <p class="msg mb-1">${payload.message}</p>
    `
    document.getElementById('chatWindow').append(messageElement)
}