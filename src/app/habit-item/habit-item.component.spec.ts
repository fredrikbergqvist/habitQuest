/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HabitItemComponent} from './habit-item.component';
import {UserDataService} from '../service/user-data.service';

const userDataServiceStub = {
    hasCompletedMaxTimes:    () => {return false},
    timesCompletedToday:     () => {return 0},
    timesCompletedThisWeek:  () => {return 0},
    timesCompletedThisMonth: () => {return 0},
    addHabit:                () => {return true},
    removeHabit:             () => {return true},
};

describe('HabitItemComponent', () => {
    let component:HabitItemComponent;
    let fixture:ComponentFixture<HabitItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HabitItemComponent],
            providers:    [{provide: UserDataService, useValue: userDataServiceStub}]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HabitItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
