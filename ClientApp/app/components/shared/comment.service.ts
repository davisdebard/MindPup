import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Comment } from '../comments/comment';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class CommentService {
   // Resolve HTTP using the constructor
    constructor(private http: Http) { }

    private commentsUrl = 'http://localhost:3000/api/comments';

    getComments(): Observable<Comment[]> {
        return this.http.get(this.commentsUrl)
            .map((res: Response) => res.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
    }
}
