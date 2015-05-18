// Class mostly based on http://richard.to/programming/ai-for-owari-part-2.html
export class MiniMax {
    // Constructor - setup board and min & max players
    constructor(flatBoard, minPlayer, maxPlayer) {
        this.wins = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
        this.board = flatBoard;
        this.minPlayer = minPlayer;
        this.maxPlayer = maxPlayer;
    }
    // Checks the player & board agains all winning combos
    isWin(player, board) {
        for (var i = 0; i < this.wins.length; i++) {
            if(board[this.wins[i][0]] == player && board[this.wins[i][1]] == player && board[this.wins[i][2]] == player) {
                return true;
            }
        }
        return false;
    }
    // Checks for full board
    isFull(board) {
        for (var i = 0; i < board.length; i++) {
            if (board[i] == null) {
                return false;
            }
        }
        return true;
    }
    // Tests if move is valid
    makeMove(move, player, board) {
        var newBoard = board.slice(0);
        if (newBoard[move] == null) {
            newBoard[move] = player;
            return newBoard;
        } else {
            return null;
        }
    }
    // Main function - runs recursively, switching between min and mx
    findMove() {
        var bestMoveValue = -100;
        var move = 0;
        for (var i = 0; i < this.board.length; i++) {
            var newBoard = this.makeMove(i, this.maxPlayer, this.board);
            if (newBoard) {
                var predictedMoveValue = this.minValue(newBoard);
                if (predictedMoveValue > bestMoveValue) {
                    bestMoveValue = predictedMoveValue;
                    move = i;
                }
            }
        }
        return move;
    }
    // check for winners & tie, otherwise make all possible moves and compare agains max
    minValue(board) {
        if (this.isWin(this.maxPlayer, board)) {
            return 1;
        } else if (this.isWin(this.minPlayer, board)) {
            return -1;
        } else if (this.isFull(board)) {
            return 0;
        } else {
            var bestMoveValue = 100;
            var move = 0;
            for (var i = 0; i < board.length; i++) {
                var newBoard = this.makeMove(i, this.minPlayer, board);
                if (newBoard) {
                    var predictedMoveValue = this.maxValue(newBoard);
                    if (predictedMoveValue < bestMoveValue) {
                        bestMoveValue = predictedMoveValue;
                        move = i;
                    }
                }
            }
            return bestMoveValue;
        }
    }
    // check for winners & tie, otherwise make all possible moves and compare agains min
    maxValue(board) {
        if (this.isWin(this.maxPlayer, board)) {
            return 1;
        } else if (this.isWin(this.minPlayer, board)) {
            return -1;
        } else if (this.isFull(board)) {
            return 0;
        } else {
            var bestMoveValue = -100;
            var move = 0;
            for (var i = 0; i < board.length; i++) {
                var newBoard = this.makeMove(i, this.maxPlayer, board);
                if (newBoard) {
                    var predictedMoveValue = this.minValue(newBoard);
                    if (predictedMoveValue > bestMoveValue) {
                        bestMoveValue = predictedMoveValue;
                        move = i;
                    }
                }
            }
            return bestMoveValue;
        }
    }
}
