
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

import { Point } from './point.type';

@Injectable()
export class PointService {

    constructor(private http: Http) {
    }

    // Get all the data as an array.
    getPoints(): Promise<Point[]> {

       return this.http.get('api/PointAPI/points')
            .map(response => response.json() as Point[])
            .toPromise()
            .catch(this.handleError);
       }

    handleError() {
        console.log(Error);
        // Do something here...
    }
}
