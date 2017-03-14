import {Injectable} from '@angular/core';
import {Habit} from '../models/habit';
import {User} from '../models/user';
import {DateService} from './date.service';
import {DataStoreService} from './data-store.service';

@Injectable()
export class UserDataService {
    private DAILY_HABITS_STRING = 'completedDailyHabits_';
    private WEEKLY_HABITS_STRING = 'completedWeeklyHabits_';
    private MONTHLY_HABITS_STRING = 'completedMonthlyHabits_';
    private USER_STRING = 'userHabits';
    completedDailyHabits:{date:number, habits:Array<number>};
    completedWeeklyHabits:{date:number, habits:Array<number>};
    completedMonthlyHabits:{date:number, habits:Array<number>};
    userProfile:User;

    constructor(private dateService:DateService, private dataStore:DataStoreService) {
        this.loadCompletedDailyHabits(new Date());
        this.loadCompletedWeeklyHabits(new Date());
        this.loadCompletedMonthlyHabits(new Date());
    }

    getDailyHabitString(selectedDate = new Date()):string {
        return this.DAILY_HABITS_STRING + selectedDate.getFullYear() + selectedDate.getMonth() + selectedDate.getDate();
    }

    getWeeklyHabitString(selectedDate = new Date()):string {
        return this.WEEKLY_HABITS_STRING + selectedDate.getFullYear() + this.dateService.getWeekNumber(selectedDate);
    }

    getMonthlyHabitString(selectedDate = new Date()):string {
        return this.MONTHLY_HABITS_STRING + selectedDate.getFullYear() + (selectedDate.getMonth() + 1);
    }

    saveUser(user:User) {
        this.dataStore.saveData(this.USER_STRING, user);
    }

    loadUser() {
        if (!this.userProfile) {
            this.userProfile = this.getUser();
        }
        return this.userProfile ? this.userProfile : null;
    }

    getUser():User {
        let userData:any = localStorage.getItem(this.USER_STRING);
        if (userData) {
            userData = JSON.parse(userData);
        }
        return userData;
    }

    private addToCurrentTotal(habit:Habit) {
        let user = this.loadUser();
        if (user) {
            user.reward = user.reward + habit.reward;

            this.saveUser(user);
        }
    }

    private removeFromCurrentTotal(habit:Habit) {
        let user = this.loadUser();
        if (user) {
            user.reward = user.reward - habit.reward;

            this.saveUser(user);
        }
    }

    addHabit(habit:Habit, selectedDate):boolean {
        let habitAdded = false;
        if (habit.maxDay) {
            if (this.hasCompletedDailyMaxTimes(habit)) {
                return false;
            }
            this.completedDailyHabits.habits.push(habit.id);
            this.dataStore.saveData(this.getDailyHabitString(selectedDate), this.completedDailyHabits);
            habitAdded = true;
        }

        if (habit.maxWeek) {
            if (this.hasCompletedWeeklyMaxTimes(habit)) {
                return false;
            }
            this.completedWeeklyHabits.habits.push(habit.id);
            this.dataStore.saveData(this.getWeeklyHabitString(selectedDate), this.completedWeeklyHabits);
            habitAdded = true;
        }

        if (habit.maxMonth) {
            if (this.hasCompletedMonthlyMaxTimes(habit)) {
                return false;
            }
            this.completedMonthlyHabits.habits.push(habit.id);
            this.dataStore.saveData(this.getMonthlyHabitString(selectedDate), this.completedMonthlyHabits);
            habitAdded = true;
        }

        if (habitAdded) {
            this.addToCurrentTotal(habit);
        }

        return habitAdded;
    }

    removeHabit(habit:Habit, selectedDate) {
        let firstIndexOf = -1;
        let habitRemoved = false;
        if (habit.maxDay) {
            firstIndexOf = this.completedDailyHabits.habits.indexOf(habit.id);
            if (firstIndexOf > -1) {
                this.completedDailyHabits.habits.splice(firstIndexOf, 1);

                this.dataStore.saveData(this.getDailyHabitString(selectedDate), this.completedDailyHabits);
                habitRemoved = true;
                firstIndexOf = -1;
            }
        }

        if (habit.maxWeek) {
            firstIndexOf = this.completedWeeklyHabits.habits.indexOf(habit.id);
            if (firstIndexOf > -1) {
                this.completedWeeklyHabits.habits.splice(firstIndexOf, 1);
                this.dataStore.saveData(this.getWeeklyHabitString(selectedDate), this.completedWeeklyHabits);
                habitRemoved = true;
                firstIndexOf = -1;
            }
        }

        if (habit.maxMonth) {
            firstIndexOf = this.completedMonthlyHabits.habits.indexOf(habit.id);
            if (firstIndexOf > -1) {
                this.completedMonthlyHabits.habits.splice(firstIndexOf, 1);
                this.dataStore.saveData(this.getMonthlyHabitString(selectedDate), this.completedMonthlyHabits);
                habitRemoved = true;
            }
        }

        if (habitRemoved) {
            this.removeFromCurrentTotal(habit);
        }
    }

    hasCompletedMaxTimes(habit:Habit):boolean {
        return this.hasCompletedDailyMaxTimes(habit) ||
            this.hasCompletedWeeklyMaxTimes(habit) ||
            this.hasCompletedMonthlyMaxTimes(habit);
    }

    timesCompletedToday(habit:Habit):number {
        return this.completedDailyHabits.habits.filter(h => h === habit.id).length;
    }

    hasCompletedDailyMaxTimes(habit:Habit):boolean {
        return habit.maxDay > 0 &&
            this.dateService.isCurrentDay(this.completedDailyHabits.date) &&
            this.completedDailyHabits.habits.filter(h => h === habit.id).length >= habit.maxDay;
    }

    timesCompletedThisWeek(habit:Habit):number {
        return this.completedWeeklyHabits.habits.filter(h => h === habit.id).length;
    }

    hasCompletedWeeklyMaxTimes(habit:Habit):boolean {
        return habit.maxWeek > 0 &&
            this.dateService.isCurrentWeek(this.completedWeeklyHabits.date) &&
            this.completedWeeklyHabits.habits.filter((h) => h == habit.id).length >= habit.maxWeek;
    }

    timesCompletedThisMonth(habit:Habit):number {
        return this.completedMonthlyHabits.habits.filter(h => h === habit.id).length;
    }

    hasCompletedMonthlyMaxTimes(habit:Habit):boolean {
        return habit.maxMonth > 0 &&
            this.dateService.isCurrentMonth(this.completedMonthlyHabits.date) &&
            this.completedMonthlyHabits.habits.filter((h) => h == habit.id).length >= habit.maxMonth;
    }

    private loadCompletedDailyHabits(selectedDate):void {
        let dailyHabits = this.dataStore.loadData(this.getDailyHabitString(selectedDate));
        const selectedDateDay = selectedDate.getDate();
        if (!dailyHabits || dailyHabits.date != selectedDateDay) {
            dailyHabits = {
                habits: [],
                date:   selectedDateDay
            }
        }

        this.completedDailyHabits = dailyHabits;
        this.dataStore.saveData(this.getDailyHabitString(selectedDate), this.completedDailyHabits);
    }

    private loadCompletedWeeklyHabits(selectedDate):void {
        let weeklyHabits = this.dataStore.loadData(this.getWeeklyHabitString(selectedDate));
        const currentWeek = this.dateService.getWeekNumber();
        if (!weeklyHabits || weeklyHabits.date != currentWeek) {
            weeklyHabits = {
                habits: [],
                date:   currentWeek
            }
        }

        this.completedWeeklyHabits = weeklyHabits;
        this.dataStore.saveData(this.getWeeklyHabitString(selectedDate), this.completedWeeklyHabits);
    }

    private loadCompletedMonthlyHabits(selectedDate):void {
        const monthlyHabitString = this.getMonthlyHabitString(selectedDate);
        let monthlyHabits = this.dataStore.loadData(monthlyHabitString);
        const currentMonth = this.dateService.selectedDate.getMonth() + 1;
        if (!monthlyHabits || monthlyHabits.date != currentMonth) {
            monthlyHabits = {
                habits: [],
                date:   currentMonth
            }
        }

        this.completedMonthlyHabits = monthlyHabits;
        this.dataStore.saveData(monthlyHabitString, this.completedMonthlyHabits);
    }

    public handleSelectedDateChange(selectedDate) {
        this.loadCompletedDailyHabits(selectedDate);
        this.loadCompletedWeeklyHabits(selectedDate);
        this.loadCompletedMonthlyHabits(selectedDate);
    }
}
