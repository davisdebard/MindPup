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
    templateUrl: './multchoice.component.html'
})
export class MultChoiceComponent {
    /**
     * @Input values come from parent.
     */ 
    @Input() answer: string;
    @Input() ans1Alt: string;
    @Input() ans2Alt: string;
    @Input() ans3Alt: string;
    @Input() answerGivenLetter: string;
    @Input() cardStatus: string;
    @Input() cardType: string;
    @Input() choiceAnswer: string;
    @Input() choiceLetter: string;
    @Input() choiceName: string;

    /**
     * @Output returns selected answer letter to parent.
     *         (The function selectAnswer(ansLetter) exists in play.component.ts, the parent.)
     */
    @Output() answerGiven: EventEmitter<string>;
    
    constructor() {
        this.answerGiven = new EventEmitter();
    }

    /**
     * choiceLetter is both an @Input (choice may have already been made - now displaying)
     *                  and an @Output (We may be making the choice now).
     */
    onAnswerSelected(choiceLetter: string): void
    {
        console.log('Choice selected is ', choiceLetter);
        this.answerGiven.emit(choiceLetter);
    }
}
