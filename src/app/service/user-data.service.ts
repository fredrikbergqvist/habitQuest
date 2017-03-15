import {Injectable} from '@angular/core';
import {Habit} from '../models/habit';
import {User} from '../models/user';
import {DateService} from './date.service';
import {UserDataStoreService} from './user-data-store.service';
import {HabitDataStoreService} from './habit-data-store.service';
import {IHabitData} from '../interface/i-habit-data';
import {HabitUtilService} from './habit-util.service';

@Injectable()
export class UserDataService {
    completedDailyHabits:IHabitData;
    completedWeeklyHabits:IHabitData;
    completedMonthlyHabits:IHabitData;
    userProfile:User;

    constructor(private userDataStoreService:UserDataStoreService,
                private habitDataStoreService:HabitDataStoreService,
                private dateService:DateService,
                private habitUtilService:HabitUtilService) {
        this.handleSelectedDateChange(new Date());
    }

    loadUser() {
        if (!this.userProfile) {
            this.userProfile = this.userDataStoreService.getUser();
        }
        return this.userProfile ? this.userProfile : null;
    }

    saveUser(user:User):void{
        this.userDataStoreService.saveUser(user);
    }


    private addToCurrentTotal(habit:Habit) {
        let user = this.loadUser();
        if (user) {
            user.reward = user.reward + habit.reward;

            this.userDataStoreService.saveUser(user);
        }
    }

    private removeFromCurrentTotal(habit:Habit) {
        let user = this.loadUser();
        if (user) {
            user.reward = user.reward - habit.reward;

            this.userDataStoreService.saveUser(user);
        }
    }

    addHabit(habit:Habit, selectedDate):boolean {
        let habitAdded = false;
        if (habit.maxDay) {
            if (this.hasCompletedDailyMaxTimes(habit, selectedDate)) {
                return false;
            }
            this.completedDailyHabits.habits.push(habit.id);
            this.habitDataStoreService.saveCompletedDailyHabits(this.completedDailyHabits, selectedDate);
            habitAdded = true;
        }

        if (habit.maxWeek) {
            if (this.hasCompletedWeeklyMaxTimes(habit, selectedDate)) {
                return false;
            }
            this.completedWeeklyHabits.habits.push(habit.id);
            this.habitDataStoreService.saveCompletedWeeklyHabits(this.completedWeeklyHabits, selectedDate);
            habitAdded = true;
        }

        if (habit.maxMonth) {
            if (this.hasCompletedMonthlyMaxTimes(habit, selectedDate)) {
                return false;
            }
            this.completedMonthlyHabits.habits.push(habit.id);
            this.habitDataStoreService.saveCompletedMonthlyHabits(this.completedMonthlyHabits, selectedDate);
            habitAdded = true;
        }

        if (habitAdded) {
            this.addToCurrentTotal(habit);
        }

        return habitAdded;
    }


    removeHabit(habit:Habit, selectedDate:Date) {
        let dailyHabitRemoved = false;
        let weeklyHabitRemoved = false;
        let monthlyHabitRemoved = false;

        if (habit.maxDay) {
            dailyHabitRemoved = this.removeHabitFromCompleted(this.completedDailyHabits, habit, selectedDate);
        }

        if (habit.maxWeek) {
            weeklyHabitRemoved = this.removeHabitFromCompleted(this.completedWeeklyHabits, habit, selectedDate);
        }

        if (habit.maxMonth) {
            monthlyHabitRemoved = this.removeHabitFromCompleted(this.completedMonthlyHabits, habit, selectedDate);
        }

        if (dailyHabitRemoved || weeklyHabitRemoved || monthlyHabitRemoved) {
            this.removeFromCurrentTotal(habit);
        }
    }

    private removeHabitFromCompleted(completedHabits:IHabitData, habit:Habit, selectedDate:Date):boolean{
        const firstIndexOf = completedHabits.habits.indexOf(habit.id);
        if (firstIndexOf > -1) {
            completedHabits.habits.splice(firstIndexOf, 1);
            this.habitDataStoreService.saveCompletedMonthlyHabits(completedHabits, selectedDate);
            return true;
        }
        return false;
    }

    hasCompletedMaxTimes(habit:Habit, selectedDate):boolean {
        return this.hasCompletedDailyMaxTimes(habit, selectedDate) ||
            this.hasCompletedWeeklyMaxTimes(habit, selectedDate) ||
            this.hasCompletedMonthlyMaxTimes(habit, selectedDate);
    }

    timesCompletedToday(habit:Habit):number {
        return this.habitUtilService.timesCompleted(habit, this.completedDailyHabits);
    }

    hasCompletedDailyMaxTimes(habit:Habit, selectedDate):boolean {
        return habit.maxDay > 0 &&
            this.dateService.isCurrentDay(this.completedDailyHabits.date, selectedDate) &&
            this.completedDailyHabits.habits.filter(h => h === habit.id).length >= habit.maxDay;
    }

    timesCompletedThisWeek(habit:Habit):number {
        return this.habitUtilService.timesCompleted(habit, this.completedWeeklyHabits);
    }

    hasCompletedWeeklyMaxTimes(habit:Habit, selectedDate):boolean {
        return habit.maxWeek > 0 &&
            this.dateService.isCurrentWeek(this.completedWeeklyHabits.date, selectedDate) &&
            this.completedWeeklyHabits.habits.filter((h) => h == habit.id).length >= habit.maxWeek;
    }

    timesCompletedThisMonth(habit:Habit):number {
        return this.habitUtilService.timesCompleted(habit, this.completedMonthlyHabits);
    }

    hasCompletedMonthlyMaxTimes(habit:Habit, selectedDate):boolean {
        return habit.maxMonth > 0 &&
            this.dateService.isCurrentMonth(this.completedMonthlyHabits.date, selectedDate) &&
            this.completedMonthlyHabits.habits.filter((h) => h == habit.id).length >= habit.maxMonth;
    }

    handleSelectedDateChange(selectedDate) {
        this.completedDailyHabits = this.habitDataStoreService.loadCompletedDailyHabits(selectedDate);
        this.completedWeeklyHabits = this.habitDataStoreService.loadCompletedWeeklyHabits(selectedDate);
        this.completedMonthlyHabits = this.habitDataStoreService.loadCompletedMonthlyHabits(selectedDate);
    }
}
