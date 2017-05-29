import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

// Update and use global variables.
export class globalvarsService {
    screenName: string;
    screenNameUpdate: Observable<string>;
    screenNameObserver: Observer<string>;

    constructor() {
        this.screenNameUpdate = Observable.create((observer: Observer<"">) => {
            this.screenNameObserver = observer;
        })
    }

    updateGlobalVar(newValue: string) {
        this.screenName = newValue;
        this.screenNameObserver.next(this.screenName);
    }
    updateScreenName(newValue: string) {
        this.screenName = newValue;
    }
}
