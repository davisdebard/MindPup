import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'intro',
    styleUrls: ['./intro.component.css'],
    templateUrl: './intro.component.html'
})
export class IntroComponent {

    constructor(private router: Router) { }

    onExplore()
    {
        // this.searchEntry = val;
        this.router.navigateByUrl('explore');
    }

}
