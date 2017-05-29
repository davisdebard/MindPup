
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

import { Games } from './games.type';

@Injectable()
export class GamesService {

    constructor(private http: Http) {
    }

    // Get Games collection.
    getGames(): Promise<Games[]> {

        return this.http.get('api/GamesAPI/Games')
            .map(response => response.json())
            .toPromise()
            .catch(this.handleError);
    }

    handleError() {
        console.log(Error);
    }
}
