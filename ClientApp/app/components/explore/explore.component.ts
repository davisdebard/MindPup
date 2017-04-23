//import { Component, Directive, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { Component, Directive, OnInit } from '@angular/core';
import { NgIf } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Game } from './game';
import { GAMES } from './mock-games';
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
})
//export class ExploreComponent implements AfterViewInit, OnInit {
export class ExploreComponent implements OnInit {
    constructor() { }

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

    // Objects.
    gameSet = GAMES;

    /******************************
    * Methods
    *******************************/
    onGameSearch(): void {
        this.resultsFound = 1;
    };

    onGameSelect(id): void {
        this.gameId = id;
    };

    ngOnInit(): void {
        
    }
  
}  // End ExploreComponent
















