import {Component, Output, EventEmitter} from '@angular/core';

@Component({
    selector:    'app-select-date',
    templateUrl: './select-date.component.html'
})
export class SelectDateComponent {
    @Output() dateChanged = new EventEmitter();
    selectedDate = new Date();

    setDate(newDate){
        this.selectedDate.setDate(newDate);
        this.dateChanged.emit(this.selectedDate);
    }

    isSelectedToday(): boolean {
        const today = new Date();
        return today.getDate() == this.selectedDate.getDate() &&
            today.getMonth() == this.selectedDate.getMonth() &&
            today.getFullYear() == this.selectedDate.getFullYear();
    }

    previousDay() {
        this.setDate(this.selectedDate.getDate()-1);
    }

    nextDay() {
        this.setDate(this.selectedDate.getDate()+1);
    }

    today():void{
        this.setDate(new Date());
    }

}
