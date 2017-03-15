import {Injectable} from '@angular/core';
import {DateService} from './date.service';
import {DataStoreService} from './data-store.service';
import {IHabitData} from '../interface/i-habit-data';

@Injectable()
export class HabitDataStoreService {
    private DAILY_HABITS_STRING = 'completedDailyHabits_';
    private WEEKLY_HABITS_STRING = 'completedWeeklyHabits_';
    private MONTHLY_HABITS_STRING = 'completedMonthlyHabits_';

    constructor(private dateService:DateService, private dataStore:DataStoreService) { }

    getDailyHabitString(selectedDate:Date = new Date()):string {
        return this.DAILY_HABITS_STRING + selectedDate.getFullYear() + selectedDate.getMonth() + selectedDate.getDate();
    }

    getWeeklyHabitString(selectedDate:Date = new Date()):string {
        return this.WEEKLY_HABITS_STRING + selectedDate.getFullYear() + this.dateService.getWeekNumber(selectedDate);
    }

    getMonthlyHabitString(selectedDate:Date = new Date()):string {
        return this.MONTHLY_HABITS_STRING + selectedDate.getFullYear() + (selectedDate.getMonth() + 1);
    }

    loadCompletedDailyHabits(selectedDate:Date):IHabitData {
        const dailyHabitString = this.getDailyHabitString(selectedDate);
        let dailyHabits = this.dataStore.loadData(dailyHabitString);
        const selectedDateDay = selectedDate.getDate();
        if (!dailyHabits || dailyHabits.date != selectedDateDay) {
            dailyHabits = {
                habits: [],
                date:   selectedDateDay
            }
        }

        this.dataStore.saveData(dailyHabitString, dailyHabits);
        return dailyHabits;
    }

    loadCompletedWeeklyHabits(selectedDate:Date):IHabitData {
        const weeklyHabitString = this.getWeeklyHabitString(selectedDate);
        let weeklyHabits = this.dataStore.loadData(weeklyHabitString);
        const currentWeek = this.dateService.getWeekNumber(selectedDate);
        if (!weeklyHabits || weeklyHabits.date != currentWeek) {
            weeklyHabits = {
                habits: [],
                date:   currentWeek
            }
        }

        this.dataStore.saveData(weeklyHabitString, weeklyHabits);
        return weeklyHabits;
    }

    loadCompletedMonthlyHabits(selectedDate:Date):IHabitData {
        const monthlyHabitString = this.getMonthlyHabitString(selectedDate);
        let monthlyHabits = this.dataStore.loadData(monthlyHabitString);
        const currentMonth = selectedDate.getMonth() + 1;
        if (!monthlyHabits || monthlyHabits.date != currentMonth) {
            monthlyHabits = {
                habits: [],
                date:   currentMonth
            }
        }

        this.dataStore.saveData(monthlyHabitString, monthlyHabits);
        return monthlyHabits;
    }

    saveCompletedDailyHabits(completedDailyHabits:IHabitData, selectedDate:Date):void{
        this.dataStore.saveData(this.getDailyHabitString(selectedDate), completedDailyHabits);
    }
    saveCompletedWeeklyHabits(completedDailyHabits:IHabitData, selectedDate:Date):void{
        this.dataStore.saveData(this.getWeeklyHabitString(selectedDate), completedDailyHabits);
    }
    saveCompletedMonthlyHabits(completedDailyHabits:IHabitData, selectedDate:Date):void{
        this.dataStore.saveData(this.getMonthlyHabitString(selectedDate), completedDailyHabits);
    }

}
