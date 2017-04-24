import { Component, Directive, OnInit } from '@angular/core';
import { NgIf } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MindPup } from '../shared/mindpup.type';
import { MINDPUP1 } from '../shared/mock-mindpup';
import { MindPupService } from '../shared/mindpup.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ]
})

@Component({
    selector: 'contact',
    templateUrl: './contact.component.html',
    styleUrls: ['contact.component.css'],
    providers: [MindPupService]
})
export class ContactComponent implements OnInit {

    constructor(private mindPupService: MindPupService) {

    }

    private contacts: MindPup[];
    
    ngOnInit(): void {
        this.mindPupService
            .getMindPup()
            .then(c => this.contacts = c);
    }
    //http.get('api/MindPupAPI/contact').subscribe(result => {
    //    this.contacts = result.json() as MindPup[];

    //getMindPup(): void {
    //    this.mindPupService.getMindPup().then(contacts => this.contacts = contacts);
    //}

}

//interface MindPup {
//    mindPupId: number;
//    addressLine1: string;
//    addressLine2: string;
//    addressLine3: string;
//    contactName: string;
//    emailMain: string;
//    phoneMain: string;
//}














