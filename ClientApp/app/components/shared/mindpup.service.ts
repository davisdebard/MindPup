
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

import { MindPup } from './mindpup.type';
import { MINDPUP1 } from './mock-mindpup';

@Injectable()
export class MindPupService {

    //constructor(private http: Http) {
    //}

    // Get all the data as an array.
    getMindPup(): Promise<MindPup[]> {

    return Promise.resolve(MINDPUP1);

        //return this.http.get('api/MindPupAPI/getMindPup')
        //    .map(response => response.json() as MindPup[])
        //    .toPromise();
    }
}
