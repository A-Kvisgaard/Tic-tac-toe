import express, { json } from 'express';
import Game from './game.js';
import errorHandler from "./Error/errorHandler.js";
const app = express();
app.use(json());
const port = 8080;

const X = "X";
const O = "O"
let game;

//Return the game state. Initialize a new game if no game has been started.
app.get('/', (req, res) => {
    if (game == undefined){
        game = new Game();
    }
    res.send(game.toJson());
})

//Clear the board and update the score
app.post('/restart', (req, res) => {
    game.resetBoard();
    res.send(game.toJson());
})

//Place the piece (either x or o) in the requested grid coordinates
app.post('/:piece', (req, res) => {
    let piece = req.params.piece.toUpperCase();
    let reqBody = req.body;
    let x = reqBody.x;
    let y = reqBody.y;

    if (piece == X || piece == O) {
        game.placePiece(x, y, piece);
    }

    res.send(game.toJson());
})
//Clear the board and scores.
app.delete('/', (req, res) => {
    game = new Game();
    res.send(JSON.stringify({ currentTurn: game.currentTurn}));
})

app.use(errorHandler);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  })

export default app;