import {
    Component,
    Input
} from '@angular/core';

@Component({
    selector: 'ctl-statement',
    styleUrls: ['./ctlstatement.component.css'],
    templateUrl: './ctlstatement.component.html'
})
export class CtlStatementComponent {
    /**
     * @Input values come from parent.
     * ctlStatementIntro  Introductory statement.
     * ctlStatementReview Review statement.
     */ 

    @Input() ctlCardStatus: string;
    @Input() ctlStatementIntro: string;
    @Input() ctlStatementReview: string;
 
    constructor() {    }

 }
