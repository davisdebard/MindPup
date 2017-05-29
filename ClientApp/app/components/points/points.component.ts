import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Point } from '../shared/point.type';
import { POINTARRAY } from '../shared/mock-point';


@Component({
    selector: 'points',
    styleUrls: ['./points.component.css'],
    templateUrl: './points.component.html'
})
export class PointsComponent implements OnInit {

    constructor(private router: Router) { }

    points: Point[];

 
    ngOnInit() {

        this.points = POINTARRAY;

    }

}
