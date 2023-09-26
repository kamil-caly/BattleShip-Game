import { Board, OpponentBoard, PlayerBoard } from "./board.js";

const socket = io.connect('http://localhost:4000');

const nicknameInput = document.getElementById('nickname');
const messages = document.getElementById('messages');
const nickButton = document.getElementById('nick_button');
const playerBoardHTML = document.getElementById('player_board');
const opponentBoardHTML = document.getElementById('opponent_board');

const rows = 10;
const cols = 10;
const shipsCount = 5;

let canClick = false;
let playerBoard;
let opponentBoard;

nickButton.addEventListener('click', function () {
    if (!nicknameInput.disabled && !validateNick(nicknameInput.value))
        return;

    makeNickInputDisable();
    makeNickButtonDisable();
    canClick = true;
    messages.value += '[SYSTEM]: ' + nicknameInput.value + ' turn' + '\n';
    playerBoard = new PlayerBoard(rows, cols, shipsCount);
    playerBoard.initGameBoard();
    playerBoard.initHTMLBoard(playerBoardHTML);

    socket.emit('send_message', { nick: nicknameInput.value, board: playerBoard });
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
    } else if (data.board && data.nick !== nicknameInput.value && !opponentBoard) {
        console.log('data.board: ', data.board);
        opponentBoard = new OpponentBoard(
            data.board.rows,
            data.board.cols,
            data.board.shipsCount,
            data.board.gameBoard);
        opponentBoard.initHTMLBoard(opponentBoardHTML);
    } else if (data.checkedFieldId) {
        messages.value += '[' + data.nickname + ']: clicked at -> ' + data.checkedFieldId + '\n';
        if (data.nickname !== nicknameInput.value) {
            playerBoard.checkField(Number(data.checkedFieldId.split('-')[0]), Number(data.checkedFieldId.split('-')[1]))
            canClick = true;
            messages.value += '[SYSTEM]: ' + nicknameInput.value + ' turn' + '\n';
        }
    }
});

opponentBoardHTML.addEventListener('click', function (e) {
    console.log('e: ', e.target.id);
    if (!canClick)
        return;

    opponentBoard && opponentBoard.checkField(Number(e.target.id.split('-')[0]), Number(e.target.id.split('-')[1]))

    socket.emit('send_message', { nick: nicknameInput.value, board: playerBoard });
    socket.emit('send_message', { nickname: nicknameInput.value, checkedFieldId: e.target.id });

    canClick = false;
})