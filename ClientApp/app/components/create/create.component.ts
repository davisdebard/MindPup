import { AppComponent } from './../app/app.component';
import { Component, Directive, OnInit } from '@angular/core';
import { NgIf } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Method } from './method';
import { Naming } from './naming';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ]
})

@Component({
    selector: 'create',
    templateUrl: './create.component.html',
    styleUrls: ['create.component.css'],
})
export class CreateComponent {

    /******************************
     * Variables
     *******************************/
    answer: string;
    answerAlt1: string;
    answerAlt2: string;
    answerAlt3: string;
    cardType: string = "Fill-In";
    gameName: string = "My Game";
    gameNameDefault: string = "My Game";
    gameNameLabel: string = "Name";
    gameOption: string = "Auto";
    level1Name: string = "My Level 1";
    level1NameDefault: string = "My Level 1";
    level1NameLabel: string = "Name";
    level1Option: string = "Auto";
    level2Name: string = "My Level 2";
    level2NameDefault: string = "My Level 2";
    level2NameLabel: string = "Name";
    level2Option: string = "Auto";
    level3Name: string = "My Level 3";
    level3NameDefault: string = "My Level 3";
    level3NameLabel: string = "Name";
    level3Option: string = "Auto";
    level4Name: string = "My Level 4";
    level4NameDefault: string = "My Level 4";
    level4NameLabel: string = "Name";
    level4Option: string = "Auto";
    level5Name: string = "My Level 5";
    level5NameDefault: string = "My Level 5";
    level5NameLabel: string = "Name";
    level5Option: string = "Auto";
    methodOption: string = "Auto";
    pointMethod: string = "Auto";
    pointName: string = "My Point";
    pointNameDefault: string = "My Point";
    pointNameLabel: string = "Name";
    pointOption: string = "Auto";
    question: string;
    statement: string;


 

   /******************************
    * Methods
    *******************************/
    onMethodChange(methodOpt)
    {
        this.methodOption = methodOpt;

        if (methodOpt == 'Professional')
        {
            this.gameOption = 'Named';
            this.level1Option = 'Named';
            this.pointOption = 'Named';
            this.cardType = 'Statement';
        }
        else
        {
            this.cardType = 'Fill-In';
        }
    }
    /******************************
     * Games
     *******************************/
    onGameOptionChange(gameOpt) {
        this.gameOption = gameOpt;

        // Return to the default.
        if (gameOpt == 'Auto') {
            this.gameName = this.gameNameDefault;
        }

        // Put a colon after the Name.
        if (gameOpt == 'Named')
            this.gameNameLabel = 'Name:';
        else
            this.gameNameLabel = 'Named';
    }
    onGameNameChange(gameNameNew) {
        this.gameName = gameNameNew;
    }

    /******************************
    * Levels
    *******************************/
    onLevel1Change(level1Opt) {
        this.level1Option = level1Opt;

        // Return to the default.
        if (level1Opt == 'Auto')
        {
            this.level1Name = this.level1NameDefault;
            this.level2Name = this.level2NameDefault;
            this.level3Name = this.level3NameDefault;
            this.level4Name = this.level4NameDefault;
            this.level5Name = this.level5NameDefault;
        }

        // Put a colon after the Name.
        if (level1Opt == 'Named')
            this.level1NameLabel = 'Name:';
        else
            this.level1NameLabel = 'Named';
    }
    onLevel2Change(level2Opt) {
        this.level2Option = level2Opt;

        // Return to the default.
        if (level2Opt == 'Auto')
        {
            this.level2Name = this.level2NameDefault;
            this.level3Name = this.level3NameDefault;
            this.level4Name = this.level4NameDefault;
            this.level5Name = this.level5NameDefault;
        }

        // Put a colon after the Name.
        if (level2Opt == 'Named')
            this.level2NameLabel = 'Name:';
        else
            this.level2NameLabel = 'Named';
    }
    onLevel3Change(level3Opt) {
        this.level3Option = level3Opt;

        // Return to the default.
        if (level3Opt == 'Auto')
        {
            this.level3Name = this.level3NameDefault;
            this.level4Name = this.level4NameDefault;
            this.level5Name = this.level5NameDefault;
        }

        // Put a colon after the Name.
        if (level3Opt == 'Named')
            this.level3NameLabel = 'Name:';
        else
            this.level3NameLabel = 'Named';
    }
    onLevel4Change(level4Opt) {
        this.level4Option = level4Opt;

        // Return to the default.
        if (level4Opt == 'Auto')
        {
            this.level4Name = this.level4NameDefault;
            this.level5Name = this.level5NameDefault;
        }

        // Put a colon after the Name.
        if (level4Opt == 'Named')
            this.level4NameLabel = 'Name:';
        else
            this.level4NameLabel = 'Named';
    }
    onLevel5Change(level5Opt) {
        this.level5Option = level5Opt;

        // Return to the default.
        if (level5Opt == 'Auto')
        {
            this.level5Name = this.level5NameDefault;
        }

        // Put a colon after the Name.
        if (level5Opt == 'Named')
            this.level5NameLabel = 'Name:';
        else
            this.level5NameLabel = 'Named';
    }

    /******************************
    * Points
    *******************************/
    onPointOptionChange(pointOpt) {
        this.pointOption = pointOpt;

        // Return to the default.
        if (pointOpt == 'Auto') {
            this.pointName = this.pointNameDefault;
        }

        // Put a colon after the Name.
        if (pointOpt == 'Named')
            this.pointNameLabel = 'Name:';
        else
            this.pointNameLabel = 'Named';
    }

    /******************************
    * Card Types
    *******************************/
    onCardTypeChange(cardTypeOpt) {
        this.cardType = cardTypeOpt;
    }
    /******************************
    * True / False
    *******************************/
    onTrueFalseChange(trueFalse) {
        this.answer = trueFalse;
    }


}  // End CreateComponent
















