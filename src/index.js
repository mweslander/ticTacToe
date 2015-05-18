import {Component, View, bootstrap, If} from 'angular2/angular2';
import {Game} from 'game';
import {Player} from 'player';
import {Computer} from 'computer';

// Element Selector
@Component({
  selector: 'main'
})
// View Annotation
@View({
  directives: [If, Game], // must instantiate child directives
  template: `
    <div class="header">
        <h1><span>Angular</span> <span>2.0</span></h1>
        <h2><span>Tic</span>, <span>Tac</span>, <span>Toe</span>tally Frustrating</h2>
    </div>
    <div *if="!choices.done" class="choices">
        <div class="chooseShape">
            <button (click)="makeChoice('shape','X')">X</button>
            <button (click)="makeChoice('shape','O')">O</button>
        </div>
    </div>
    <game *if="choices.done" [person]="person" [computer]="computer" [csize]="csize" class="game"></game>
    <footer (click)="resetChoices()" [style.width]="csize" class="footer">
        <a (click)="resetChoices()">Start Over</a>
    </footer>
  `
})
// Main "Controller"
class Main {
    constructor() {
        // Helps us determine the size for our cells so the whole game fits
        this.findSize();
        // empty choices to begin
        this.resetChoices();
    }
    // Sets the choice and checks the status
    makeChoice(type, choice) {
        // set the choice
        this.choices[type] = choice;
        this.checkStatus();
    }
    // Checks to see if we have everything we need to play -- a turn and a shape
    checkStatus() {
        if (this.choices.turn && this.choices.shape) {
            // if so, instantiate a new person player
            this.person = new Player(this.choices.shape);
            this.computer = new Computer(this.choices.shape);
            // and change the indicator to update the view
            this.choices.done = true;
        }
    }
    // Convenience method to clear out the choices
    resetChoices() {
        // We are always going to go first for now -- left turn in for future
        this.choices = {done: false, turn: true, shape: ''};
    }
    // finds the size of the window to make some nice squares
    findSize() {
        var height = window.innerHeight - 180;
        var width = window.innerWidth;
        this.csize = height/width > 1 ? Math.floor(0.9 * width / 4) : Math.floor(0.9 * height / 4);
    }
}
// bootstrap the app
bootstrap(Main);
