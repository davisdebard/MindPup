
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

import { MindPup } from './mindpup.type';
import { MINDPUP1 } from './mock-mindpup';

@Injectable()
export class MindPupService {

    constructor(private http: Http) {
    }

    // Get all the data as an array.
    getMindPup(): Promise<MindPup[]> {

        // return Promise.resolve(MINDPUP1);

        return this.http.get('api/MindPupAPI/contact')
            .map(response => response.json() as MindPup[])
            .toPromise()
            .catch(this.handleError);

        //return this.http.get('api/MindPup')
        //    .toPromise()
        //    .then(response => response.json().value)
        //    .catch(this.handleError);
    }

    handleError() {
        console.log(Error);
        // Do something here...
    }
}
