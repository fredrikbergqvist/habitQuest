import {Component, OnInit, Input} from '@angular/core';
import {HabitGroup} from '../models/habit-group';

@Component({
    selector:    'app-habit-group',
    templateUrl: './habit-group.component.html'
})
export class HabitGroupComponent implements OnInit {
    @Input() habitGroup:HabitGroup;

    constructor() {}

    ngOnInit() {}


}
