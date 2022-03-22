const X = "X";
const O = "O"
import Board from "./board.js";
import NotAcceptable from "./Error/notAcceptable.js";

export default class Game {
    constructor() {
        this.score = { X: 0, O: 0 };
        this.currentTurn = X;
        this.board = new Board();
        this.placePiece = function (x, y, piece) {
            if (this.currentTurn == piece) {
                this.board.placePiece(x, y, piece);
                this.currentTurn = piece === X ? O : X;
            } else {
                throw new NotAcceptable(`It's not ${piece}'s turn to place`)
            }

        };
        this.resetBoard = function () {
            const winner = this.board.winner;
            if (winner != "") {
                this.score[winner]++;
            }
            this.currentTurn = X;
            this.board = new Board();
        };
        this.toJson = function(){
            return JSON.stringify({
                board: this.board.board,
                score: this.score,
                currentTurn: this.currentTurn,
                victory: this.board.winner
            });
        }
    }
}