import {Injectable} from '@angular/core';
import {Habit} from '../models/habit';

@Injectable()
export class UserDataService {
    private DAILY_HABITS_STRING = 'completedDailyHabits';
    private WEEKLY_HABITS_STRING = 'completedWeeklyHabits';
    private MONTHLY_HABITS_STRING = 'completedMonthlyHabits';
    completedDailyHabits: {date: number, habits: Array<number>};
    completedWeeklyHabits: {date: number, habits: Array<number>};
    completedMonthlyHabits: {date: number, habits: Array<number>};

    constructor() {
        this.loadCompletedDailyHabits();
        this.loadCompletedWeeklyHabits();
        this.loadCompletedMonthklyHabits();
    }

    addHabit(habit:Habit): boolean {
        if (habit.maxDay) {
            if (this.hasCompletedDailyMaxTimes(habit)) {
                return false;
            }
            this.completedDailyHabits.habits.push(habit.id);
            UserDataService.saveHabits(this.DAILY_HABITS_STRING, this.completedDailyHabits);
        }

        if (habit.maxWeek) {
            if (this.hasCompletedWeeklyMaxTimes(habit)) {
                return false;
            }
            this.completedWeeklyHabits.habits.push(habit.id);
            UserDataService.saveHabits(this.WEEKLY_HABITS_STRING, this.completedWeeklyHabits);
        }

        if (habit.maxMonth) {
            if (this.hasCompletedMonthlyMaxTimes(habit)) {
                return false;
            }
            this.completedMonthlyHabits.habits.push(habit.id);
            UserDataService.saveHabits(this.MONTHLY_HABITS_STRING, this.completedMonthlyHabits);
        }
        return false;
    }

    hasCompletedMaxTimes(habit:Habit):boolean {
        return this.hasCompletedDailyMaxTimes(habit) ||
            this.hasCompletedWeeklyMaxTimes(habit) ||
            this.hasCompletedMonthlyMaxTimes(habit);
    }

    hasCompletedDailyMaxTimes(habit:Habit): boolean {
        return habit.maxDay > 0 && this.completedDailyHabits.habits.filter(h => h === habit.id).length >= habit.maxDay;
    }

    hasCompletedWeeklyMaxTimes(habit:Habit): boolean {
        return habit.maxWeek > 0 && this.completedWeeklyHabits.habits.filter((h) => h == habit.id).length >= habit.maxWeek;
    }

    hasCompletedMonthlyMaxTimes(habit:Habit): boolean {
        return habit.maxMonth > 0 && this.completedMonthlyHabits.habits.filter((h) => h == habit.id).length >= habit.maxMonth;
    }

    private loadCompletedDailyHabits():void {
        let dailyHabits = JSON.parse(localStorage.getItem(this.DAILY_HABITS_STRING));
        const today = new Date().getDate();
        if (!dailyHabits || dailyHabits.date != today) {
            dailyHabits = {
                habits: [],
                date:   today
            }
        }

        this.completedDailyHabits = dailyHabits;
        UserDataService.saveHabits(this.DAILY_HABITS_STRING, this.completedDailyHabits);
    }

    private loadCompletedWeeklyHabits():void {
        let weeklyHabits = JSON.parse(localStorage.getItem(this.WEEKLY_HABITS_STRING));
        const currentWeek = UserDataService.weekNumber();
        if (!weeklyHabits || weeklyHabits.date != currentWeek) {
            weeklyHabits = {
                habits: [],
                date:   currentWeek
            }
        }

        this.completedWeeklyHabits = weeklyHabits;
        UserDataService.saveHabits(this.WEEKLY_HABITS_STRING, this.completedWeeklyHabits);
    }

    private loadCompletedMonthklyHabits():void {
        let monthlyHabits = JSON.parse(localStorage.getItem(this.MONTHLY_HABITS_STRING));
        const currentMonth = new Date().getMonth();
        if (!monthlyHabits || monthlyHabits.date != currentMonth) {
            monthlyHabits = {
                habits: [],
                date:   currentMonth
            }
        }

        this.completedMonthlyHabits = monthlyHabits;
        UserDataService.saveHabits(this.MONTHLY_HABITS_STRING, this.completedMonthlyHabits);
    }

    private static saveHabits(habitString:string, data:any) {
        localStorage.setItem(habitString, JSON.stringify(data));
    }

    private static weekNumber():number {
        let d: any = new Date();
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        const yearStart: any = new Date(d.getFullYear(), 0, 1);
        return Math.ceil(( ( (d - yearStart) / 86400000) + 1) / 7);
    };
}
