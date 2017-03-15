/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HabitGroupComponent} from './habit-group.component';
import {HabitItemComponent} from '../habit-item/habit-item.component';

describe('HabitGroupComponent', () => {
    let component:HabitGroupComponent;
    let fixture:ComponentFixture<HabitGroupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HabitItemComponent, HabitGroupComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HabitGroupComponent);
        component = fixture.componentInstance;
        component.selectedDate = new Date();
        component.habitGroup = {
            name:        'name',
            description: 'desc',
            habits:      []
        }
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
