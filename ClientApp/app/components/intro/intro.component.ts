import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Intro } from './intro';
import { INTROS } from './mock-intros';

@Component({
    selector: 'intro',
    styleUrls: ['./intro.component.css'],
    templateUrl: './intro.component.html'
})
export class IntroComponent implements OnInit {

    constructor(private router: Router) { }

    descriptionVal = "";
    intros = INTROS;
    intro: Intro;
    isAtBeginning = true;
    isAtEnd = false;
    sortNo = 0;         // Advances to 1 with OnInit().
    sortNoMax = 3;
    titleVal = "";

    ngOnInit() {
        this.moveOn('Up');
    }

    // Direction = 'Up' or 'Down'.
    moveOn(direction)
    {
        var i = 0;
        if (direction == 'Up') {
            this.sortNo++;
        }        else {
            this.sortNo--;
        }
      
        for (let intr of this.intros) {
            i++;
            if (intr.SortOrder == this.sortNo) {
                this.titleVal = intr.Title;
                this.descriptionVal = intr.Description;

                this.isAtBeginning = false;
                if (i == 1) this.isAtBeginning = true;

                this.isAtEnd = false;
                if (i == this.sortNoMax) this.isAtEnd = true;

                break;
            }
        }
    }

    onExplore()
    {
        // this.searchEntry = val;
        this.router.navigateByUrl('explore');
    }

}
