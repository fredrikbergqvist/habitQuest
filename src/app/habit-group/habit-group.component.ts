import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {HabitGroup} from '../models/habit-group';

@Component({
    selector:    'app-habit-group',
    templateUrl: './habit-group.component.html'
})
export class HabitGroupComponent implements OnInit, OnChanges {
    @Input() habitGroup:HabitGroup;

    constructor() {}

    public ngOnInit() {}

    public ngOnChanges(changes: SimpleChanges): void {

    }


}
