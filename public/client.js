const socket= io();

let name;
let textarea= document.querySelector('#textarea');
let messageArea = document.querySelector('.message_area')

do{
    name= prompt("Please enter you name: ")
} while(!name);

textarea.addEventListener('keyup', (e) => {
    if(e.key==='Enter'){
        sendMessage(e.target.value);
    }
})

function sendMessage(message) {
    let msg= { //a new variable
        user:name,
        message: message.trim()
    }
    //append meeage in sender side
    appendMessage(msg, 'outgoing')
    textarea.value= ""
    scrollToBottom()
    //send message to server
    socket.emit('message', msg); //name for the emit evnt:message and the data 
}

function appendMessage(msg, type){ //type=incoming/outgoing
    let mainDiv= document.createElement('div')
    let className= type
    mainDiv.classList.add(className, 'message')

    let markup =`
        <h4>${type=='outgoing' ? "You" : msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv)
}

//recieve message from server
socket.on('message', (msg) => {
    // console.log(msg); //clien side code, so will run in browsers console
    appendMessage(msg, 'incoming');
    playMessageSound();
    scrollToBottom()
})

function scrollToBottom(){
    messageArea.scrollTop= messageArea.scrollHeight
}

function playMessageSound() {
    const sound = new Audio('/sound.mp3');
    sound.play();
}