const X = "X";
const O = "O"
import Conflict from "./Error/conflict.js";
import NotAcceptable from "./Error/notAcceptable.js";

export default class Board {
    constructor() {
        this.winner = '';
        this.board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        this.placePiece = function (x, y, piece) {
            if (this.board[y][x] != '') {
                throw new Conflict(`A piece has already been placed at (${x}, ${y})`)
            }
            if (this.winner != '') {
                throw new NotAcceptable('Game already has a winner')
            }
            this.board[y][x] = piece;
            //Check if recently placed piece  a winner. Should first check after 5 pieces have been placed
            if (this.board[y][0] === piece && ( this.board[y][0] === this.board[y][1] && this.board[y][0] === this.board[y][2]) ||   //Check coloum
                (this.board[0][x] === piece && ( this.board[0][x] === this.board[1][x] && this.board[0][x] === this.board[2][x])) || //Check row 
                (this.board[0][0] === piece && ( this.board[0][0] === this.board[1][1] && this.board[0][0] === this.board[2][2])) || // Check diagonal top left -> bottom right 
                (this.board[2][0] === piece && ( this.board[2][0] === this.board[1][1] && this.board[2][0] === this.board[0][2]))) { // Check diagonal top right -> bottom right
                this.winner = piece;
            }
        };

    }
}
