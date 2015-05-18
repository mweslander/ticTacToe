export class Board {
    // Sets up wins, rows and cells fro game;
    constructor() {
        // setup the square array for external use
        this.rows = [];
        // winning combos
        this.wins = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
        // sets up the cells
        this.setupCells();
        // shows the winner or tie
        this.gameEnd;
    }
    // Method to set 3 rows of 3 squares
    setupCells() {
        for (var i = 0; i < 3; i++) {
            this.rows.push([]);
            for (var j = 0; j < 3; j++) {
                this.rows[i].push(null);
            }
        }
        return true;
    }
    // Method to select a cell
    selectCell(row, col, shape, turn) {
        if (this.rows[row][col] === null) {
            this.rows[row][col] = shape;
            return true;
        } else {
            console.log('cell taken');
            return false;
        }
    }
    // Evaluation of board for win and full
    evaluate(playerShape) {
        var flatBoard = this.flatten();
        // see if there is a winner
        if (!this.isWin(playerShape, flatBoard)) {
            // no winner yet
            // is the board full?
            if (!this.isFull(flatBoard)) {
                // nope! -> next player's turn
                return true;
            } else {
                this.gameEnd = 'Tied!';
            }
        } else {
            this.gameEnd = 'Computer win';
        }
    }
    // Flattens the board for easier evaluation
    flatten() {
        var flat = [];
        var reduction = this.rows.reduce(function(a, b) { return a.concat(b);});
        for (var i = 0; i < reduction.length; i++) {
            flat.push(reduction[i]);
        }
        return flat;
    } 
    // Maps the flattend location to board location
    mapKeyToCell(key) {
        for (var i = 0; i < this.rows.length; i++) {
            for (var j = 0; j < this.rows[i].length; j++) {
                if (i * 3 + j === key) {
                    return [i, j];
                }
            }
        }
    }
    // TODO: Abstract these two functions - duplicated in MiniMax
    // Check the mapped cells against the winning combos
    isWin(player, board) {
        for (var i = 0; i < this.wins.length; i++) {
            if(board[this.wins[i][0]] == player && board[this.wins[i][1]] == player && board[this.wins[i][2]] == player) {
                return true;
            }
        }
        return false;
    }
    // A check to see if the board is full
    isFull(board) {
        for (var i = 0; i < board.length; i++) {
            if (board[i] == null) {
                return false;
            }
        }
        return true;
    }
}
