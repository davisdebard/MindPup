import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {

    constructor(private router: Router) { }

    /******************************
    * Variables
    ******************************/
    isIntro = false;
    isLoggedIn = false;
    searchEntry = "";
    userName = "Davis";

    /******************************
    * Methods
    ******************************/
    onFreeAccount(): void {
        // TO DO: Have create account functionality.
        this.isLoggedIn = true;
    }

    // Show introduction.
    onIntro(): void {
        this.isIntro = true;
    }

    onSearchKeyPress(val:string): void {
       // this.searchEntry = val;
       this.router.navigateByUrl('explore');
        
    }

    onLogIn()
    {
        // TO DO: Have log in functionality.
        this.isLoggedIn = true;
    }

}
