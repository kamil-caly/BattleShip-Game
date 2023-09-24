import { Board } from "./board.js";

const socket = io.connect('http://localhost:4000');

const nicknameInput = document.getElementById('nickname');
const messages = document.getElementById('messages');
const nickButton = document.getElementById('nick_button');
const playerBoardHTML = document.getElementById('player_board');
const opponentBoardHTML = document.getElementById('opponent_board');

const rows = 10;
const cols = 10;

let startGame = false;
let playerBoard;
let opponentBoard;

nickButton.addEventListener('click', function () {
    if (!nicknameInput.disabled && !validateNick(nicknameInput.value))
        return;

    makeNickInputDisable();
    makeNickButtonDisable();
    startGame = true;
    playerBoard = new Board(playerBoardHTML, rows, cols, 7);
    //opponentBoard = new Board(opponentBoardHTML, rows, cols);

    //socket.emit('send_message', message);
    //inputMessage.value = '';
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

const makeNickButtonDisable = () => {
    if (!nickButton.disabled)
        nickButton.disabled = true;
}

socket.on('receive_message', function (data) {
    if (data.system) {
        messages.value += '[SYSTEM]: ' + data.text + '\n';
    } else {
        messages.value += data.nickname + ': ' + data.text + '\n';
    }
});

opponentBoardHTML.addEventListener('click', function (e) {
    console.log('e: ', e);
    if (!startGame)
        return;


})