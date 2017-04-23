import { Component, Directive, OnInit } from '@angular/core';
import { NgIf } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ]
})

@Component({
    selector: 'testing',
    templateUrl: './testing.component.html',
    styleUrls: ['testing.component.css'],
})
export class TestingComponent {

}  // End TestingComponent
















