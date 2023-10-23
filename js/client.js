const socket = io('http://localhost:7000');


const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
const audio=new Audio("tingtong.wav")


const append=(message, position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
};

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`you:${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';
})
const username = prompt("Enter your name to join");
socket.emit("newUser", username);

socket.on('user-joined', data => {
    append(`${username} joined chat`,'right');
    // console.log(`${data} has joined the chat.`);
});

socket.on('receive', data => {
    append(`${data.name}:${data.message}`,'left');
    // console.log(`${data} has joined the chat.`);
});

socket.on('leave', data => {
    append(`${data} left chat`,'left');
    // console.log(`${data} has joined the chat.`);
});


