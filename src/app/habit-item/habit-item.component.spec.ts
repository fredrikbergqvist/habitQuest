/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HabitItemComponent } from './habit-item.component';

describe('HabitItemComponent', () => {
  let component: HabitItemComponent;
  let fixture: ComponentFixture<HabitItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabitItemComponent ]
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
