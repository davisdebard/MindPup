
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

import { Contacts } from './contacts.type';

@Injectable()
export class ContactsService {

    constructor(private http: Http) {
    }

    // Error message:  Subscription cannot be assigned to type MindPup.
    //                 Property mindPupId is missing in type Subscription.
    //getMindPup(): MindPup {
    //    return this.http.get('api/MindPupAPI/Contact').subscribe(result => this.contact = result.json() as Contacts);
    //}

    // Get Contacts collection.
    getContacts(): Promise<Contacts[]> {

        return this.http.get('api/ContactsAPI/Contacts')
            .map(response => response.json())
            .toPromise()
            .catch(this.handleError);
    }

    handleError() {
        console.log(Error);
    }
}
