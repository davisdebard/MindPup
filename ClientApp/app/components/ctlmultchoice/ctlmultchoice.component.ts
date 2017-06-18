import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import { MultChoiceComponent } from '../multchoice/multchoice.component';

@Component({
    selector: 'ctl-mult-choice',
    styleUrls: ['./ctlmultchoice.component.css'],
    templateUrl: './ctlmultchoice.component.html'
})
export class CtlMultChoiceComponent {
    /**
     * @Input values come from parent.
     * ctlAnswer   A, B, C or D value of the answer.
     * ctlLetter   A, B, C or D value of this control.
     * ctlSelected A, B, C or D value already selected for ctlStatus in ('Seen Correct', 'Seen Incorrect').
     *                                                              Empty for ctlStatus = 'Play Question'.
     * ctlStatus   Expect only 'Play Question', 'Seen Correct' or 'Seen Incorrect', though there are additional statuses.
     * ctlText     The text of this choice.
     */ 
    @Input() ctlAnswer: string;
    @Input() ctlLetter: string;
    @Input() ctlSelected: string;
    @Input() ctlStatus: string;
    @Input() ctlText: string;
 
    /**
     * @Output returns selected answer letter to parent.
     *         (The function selectAnswer(ansLetter) exists in play.component.ts, the parent.)
     */
    @Output() ctlChoice: EventEmitter<string>;
    
    constructor() {
        this.ctlChoice = new EventEmitter();
    }

    /**
     * ctlSelected = what has already been selected from a previous step.
     * ctlChoice   = what is now being selected (status = 'Play Question').
     * choiceLetter = the string that is passed in by the Click event.
     */
    ctlSelect(choiceLetter: string): void
    {
        console.log('Choice is ', choiceLetter);
        this.ctlChoice.emit(choiceLetter);
    }
}
