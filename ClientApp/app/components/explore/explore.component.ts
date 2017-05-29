//import { Component, Directive, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { Component, Directive, OnInit } from '@angular/core';
import { NgIf } from '@angular/common'
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Games } from '../shared/games.type';
import { GamesService } from '../shared/games.service';
import { FocusDirective } from '../shared/focus-directive';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        FocusDirective
    ]
})

@Component({
    selector: 'explore',
    templateUrl: './explore.component.html',
    styleUrls: ['explore.component.css'],
    providers: [ GamesService ]
})
//export class ExploreComponent implements AfterViewInit, OnInit {
export class ExploreComponent implements OnInit {
    constructor(private gamesService: GamesService) {
    }
    games = [{
        GameId: 1,
        Title: '',
        DateCreated: null,
        ThemeId: 1,
        UserId: 1,
        zSystemUse: null
    }];

    ngOnInit(): void {

        this.gamesService
            .getGames()
            .then(g => this.games = g);
    }

    // @ViewChildren('input') vc;

    // Set focus on Input box.
    // ngAfterViewInit() {
    ////     this.vc.first.nativeElement.focus();
    // }

    /******************************
    * Values
    *******************************/
    gameId = 0;
    resultsFound = 0;

    /******************************
    * Methods
    *******************************/
    onGameSearch(): void {
        this.resultsFound = 1;
    };

    onGameSelect(id): void {
        this.gameId = id;
    };
}  // End ExploreComponent
















