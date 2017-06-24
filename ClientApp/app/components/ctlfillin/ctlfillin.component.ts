import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';

@Component({
    selector: 'ctl-fill-in',
    styleUrls: ['./ctlfillin.component.css'],
    templateUrl: './ctlfillin.component.html'
})
export class CtlFillInComponent {
    /**
     * @Input values come from parent.
     * ctlAnswer      Text value of the answer.
     * ctlCardStatus  Expect only 'Play Question', 'Seen Correct' or 'Seen Incorrect', though there are additional statuses.
     * ctlCardType    Only "Fill-In" and "Fill-In Swappable" apply.
     */ 
    @Input() ctlAnswer: string;
    @Input() ctlCardType: string;
    @Input() ctlCardStatus: string;

    ctlAnswerGiven: string;
    /**
      * @Output returns selected answer to parent.
      *         (The function selectFillIn(fillInAnswer) exists in play.component.ts, the parent.)
      */
    @Output() ctlAnswerText: EventEmitter<string>;

    constructor() {
        this.ctlAnswerText = new EventEmitter();
    }

    /**
      * ctlSelected = what has already been selected from a previous step.
      * ctlChoice   = what is now being selected (status = 'Play Question').
      * answerGiven = the string that is passed in by the Change event.
      */
    enterFillIn(): void {
        console.log('Answer is ', this.ctlAnswerGiven);
        this.ctlAnswerText.emit(this.ctlAnswerGiven);
    }

}
