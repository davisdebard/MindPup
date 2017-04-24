import { Component } from '@angular/core';
import { MindPupService } from '../shared/mindpup.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [MindPupService]
})
export class AppComponent {

    constructor(private mindPupService: MindPupService) {

    }

}
