import { Component, Directive, NgModule, OnInit } from '@angular/core';
import { NgIf } from '@angular/common'
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { Contacts } from '../shared/contacts.type';
import { ContactsService } from '../shared/contacts.service';

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
    providers: [ ContactsService ]
})

export class ContactComponent implements OnInit {

    constructor(private contactsService: ContactsService) {
    }

    contacts;  // Contacts;

    ngOnInit(): void {

        this.contactsService
            .getContacts()
            .then(contact => this.contacts = contact);
    }
}











