# Battleship Game with Socket.io

This project is a simple real-time implementation of the Battleship game using Express, Socket.io, and vanilla JavaScript.

## Overview

The game allows two players to connect and compete against each other. Each player's board is initialized with ships placed randomly. Players take turns clicking on their opponent's board to hit and sink ships. The game continues until one of the players has sunk all of the opponent's ships.

## Features:

- Real-time gameplay using Socket.io
- Random ship placement
- Interactive game boards for both players
- Simple chat to display system and game-related messages

## Getting Started

1. Clone the repository:
```bash
git clone [your-repository-url]
cd [repository-name]
```

2. Install the dependencies:
```bash
npm install express socket.io
```

3. Start the server:
```bash
node server.js
```

4. Navigate to `http://localhost:4000` in your web browser to access the game.

## How to Play:

1. Enter your nickname and submit.
2. Wait for the second player to join.
3. When it's your turn, click on a cell in your opponent's board to make an attempt to hit a ship.
4. Play alternates between players after each click.
5. The game continues until all ships on one player's board are hit. The player who hits all the ships first wins.

## File Structure

- `server.js`: Initializes the Express server and handles Socket.io connections.
- `board.js`: Contains game logic, defining the game board and ship placements.
- `client.js`: Manages frontend interactions and communicates with the server via Socket.io.

