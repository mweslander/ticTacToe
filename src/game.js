import {Component, View, For, If} from 'angular2/angular2';
import {Board} from 'board';
import {Player} from 'player';

@Component({
    selector: 'game',
    services: [Board, Player], // this is where the services get passed in
    properties: {
        person: 'person',
        computer: 'computer',
        csize: 'csize'
    }
})

@View({
  directives: [For, If], // must instantiate child directives
  template: `
    <h1 *if="board.gameEnd">{{board.gameEnd}}</h1>
    <div *for="#row of board.rows; #i = index" class="row" [style.height]="csize">
        <svg *for="#cell of row; #j = index" [style.width]="csize" [style.height]="csize" class="cell" (click)="personSelect(i, j)">
            <text x="50%" y="60%" class="cellText">{{board.rows[i][j]}}</text>
        </svg>
    </div>
  `
})

export class Game {
    constructor() {
        // Constructor includes board.rows
        this.board = new Board();
        // for now, we're always going to start first
        this.turn = true;
    }
    // Method for selection by person
    personSelect(row, col) {
        if (this.turn === true) {
            if(this.board.selectCell(row, col, this.person.shape) ) {
                if (this.board.evaluate(this.person.shape)) {
                    this.nextTurn();
                    this.computerSelect();
                }
            };  
        } 
    }
    // Selection by computer
    computerSelect() {
        var c = this.computer.selectCell(this.board, this.person);
        if (c) {
            this.board.selectCell(c[0], c[1], this.computer.shape);
            if (this.board.evaluate(this.computer.shape)) {
                this.nextTurn();
            }
        }
    }
    // Advance the turn
    nextTurn() {
        this.turn = !this.turn;
    }
}
