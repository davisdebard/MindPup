import { Component, Directive, OnInit } from '@angular/core';
import { NgIf } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MindPup } from '../shared/mindpup.type';
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
    providers: [ MindPupService ]
})
export class ContactComponent implements OnInit {

    contacts: MindPup[];

    constructor(private mindPupService: MindPupService)
    {

    }

    ngOnInit(): void {
        this.getMindPup();
    }

    getMindPup(): void {
        this.mindPupService.getMindPup().then(contacts => this.contacts = contacts);
    }
    
    //constructor(http: Http) {
    //    http.get('api/MindPupAPI/MindPup').subscribe(result => {
    //        this.contacts = result.json() as MindPup[];
    //    });
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














