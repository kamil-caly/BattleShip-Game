const socket = io.connect('http://localhost:4000');

const nicknameInput = document.getElementById('nickname');
const messages = document.getElementById('messages');
const inputMessage = document.getElementById('inputMessage');
const sendButton = document.getElementById('sendButton');


sendButton.addEventListener('click', function () {
    if (!nicknameInput.disabled && !validateNick(nicknameInput.value))
        return;

    const message = {
        nickname: nicknameInput.value,
        text: inputMessage.value
    };
    makeNickInputDisable();

    socket.emit('send_message', message);
    inputMessage.value = '';
});

const validateNick = (nick) => {
    if (!nick) {
        alert("Write Nick!")
        return false;
    }
    if (messages.value.includes(`${nicknameInput.value}: `)) {
        alert("Nick taken, select other one!")
        return false;
    }

    return true;
}

const makeNickInputDisable = () => {
    if (!nicknameInput.disabled)
        nicknameInput.disabled = true;
}

socket.on('receive_message', function (data) {
    if (data.system) {
        messages.value += '[SYSTEM]: ' + data.text + '\n';
    } else {
        messages.value += data.nickname + ': ' + data.text + '\n';
    }
});