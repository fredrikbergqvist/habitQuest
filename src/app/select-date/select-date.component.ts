import {Component, OnInit} from '@angular/core';
import {DateService} from '../service/date.service';

@Component({
    selector:    'app-select-date',
    templateUrl: './select-date.component.html'
})
export class SelectDateComponent implements OnInit {

    constructor(public dateService: DateService) {
    }

    ngOnInit() {
    }

    isSelectedToday(): boolean {
        const today = new Date();
        return today.getDate() == this.dateService.selectedDate.getDate() &&
            today.getMonth() == this.dateService.selectedDate.getMonth() &&
            today.getFullYear() == this.dateService.selectedDate.getFullYear();
    }

    previousDay() {
        this.dateService.selectedDate.setDate(this.dateService.selectedDate.getDate()-1);
        this.dateService.setSelectedDate(this.dateService.selectedDate);
    }

    nextDay() {
        this.dateService.selectedDate.setDate(this.dateService.selectedDate.getDate()+1);
        this.dateService.setSelectedDate(this.dateService.selectedDate);
    }

    today():void{
        this.dateService.setSelectedDate(new Date());

    }

}
