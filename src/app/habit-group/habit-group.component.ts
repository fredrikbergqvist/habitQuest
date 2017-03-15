import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {HabitGroup} from '../models/habit-group';

@Component({
    selector:    'app-habit-group',
    templateUrl: './habit-group.component.html'
})
export class HabitGroupComponent {
    @Input() habitGroup:HabitGroup;
    @Input() selectedDate:any;


}
