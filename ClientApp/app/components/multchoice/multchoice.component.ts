import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import { CtlMultChoiceComponent } from '../ctlmultchoice/ctlmultchoice.component';

@Component({
    selector: 'mult-choice',
    styleUrls: ['./multchoice.component.css'],
    templateUrl: './multchoice.component.html',
})
export class MultChoiceComponent {
    /**
     * @Input values come from parent.
     */
    @Input() mcCardType: string;
 
    @Input() mcAnswer: string;
    @Input() mcSelected: string;
    @Input() mcStatus: string;
    @Input() mcTextA: string;
    @Input() mcTextB: string;
    @Input() mcTextC: string;
    @Input() mcTextD: string;
    
    /**
     * @Output returns selected answer letter to parent.
     *         (The function selectAnswer(ansLetter) exists in play.component.ts, the parent.)
     */
    @Output() mcChoice: EventEmitter<string>;
    
    constructor() {
        this.mcChoice = new EventEmitter();
    }

    /**
     * choiceLetter is both an @Input (choice may have already been made - now displaying)
     *                  and an @Output (We may be making the choice now).
     */
    mcSelect(choiceLetter: string): void
    {
        console.log('Multiple choice selected is ', choiceLetter);
        this.mcChoice.emit(choiceLetter);
    }
}
