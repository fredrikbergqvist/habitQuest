import {Injectable} from '@angular/core';
import {Habit} from '../models/habit';
import {User} from '../models/user';
import {DateService} from './date.service';
import {UserDataStoreService} from './user-data-store.service';
import {HabitDataStoreService} from './habit-data-store.service';
import {IHabitData} from '../interface/i-habit-data';

@Injectable()
export class UserDataService {
    completedDailyHabits:IHabitData;
    completedWeeklyHabits:IHabitData;
    completedMonthlyHabits:IHabitData;
    userProfile:User;

    constructor(private userDataStoreService:UserDataStoreService, private habitDataStoreService:HabitDataStoreService, private dateService:DateService) {
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

    removeHabit(habit:Habit, selectedDate) {
        let firstIndexOf = -1;
        let habitRemoved = false;
        if (habit.maxDay) {
            firstIndexOf = this.completedDailyHabits.habits.indexOf(habit.id);
            if (firstIndexOf > -1) {
                this.completedDailyHabits.habits.splice(firstIndexOf, 1);

                this.habitDataStoreService.saveCompletedDailyHabits(this.completedDailyHabits, selectedDate);
                habitRemoved = true;
                firstIndexOf = -1;
            }
        }

        if (habit.maxWeek) {
            firstIndexOf = this.completedWeeklyHabits.habits.indexOf(habit.id);
            if (firstIndexOf > -1) {
                this.completedWeeklyHabits.habits.splice(firstIndexOf, 1);
                this.habitDataStoreService.saveCompletedWeeklyHabits(this.completedWeeklyHabits, selectedDate);
                habitRemoved = true;
                firstIndexOf = -1;
            }
        }

        if (habit.maxMonth) {
            firstIndexOf = this.completedMonthlyHabits.habits.indexOf(habit.id);
            if (firstIndexOf > -1) {
                this.completedMonthlyHabits.habits.splice(firstIndexOf, 1);
                this.habitDataStoreService.saveCompletedMonthlyHabits(this.completedMonthlyHabits, selectedDate);
                habitRemoved = true;
            }
        }

        if (habitRemoved) {
            this.removeFromCurrentTotal(habit);
        }
    }

    hasCompletedMaxTimes(habit:Habit, selectedDate):boolean {
        return this.hasCompletedDailyMaxTimes(habit, selectedDate) ||
            this.hasCompletedWeeklyMaxTimes(habit, selectedDate) ||
            this.hasCompletedMonthlyMaxTimes(habit, selectedDate);
    }

    timesCompletedToday(habit:Habit):number {
        return this.completedDailyHabits.habits.filter(h => h === habit.id).length;
    }

    hasCompletedDailyMaxTimes(habit:Habit, selectedDate):boolean {
        return habit.maxDay > 0 &&
            this.dateService.isCurrentDay(this.completedDailyHabits.date, selectedDate) &&
            this.completedDailyHabits.habits.filter(h => h === habit.id).length >= habit.maxDay;
    }

    timesCompletedThisWeek(habit:Habit):number {
        return this.completedWeeklyHabits.habits.filter(h => h === habit.id).length;
    }

    hasCompletedWeeklyMaxTimes(habit:Habit, selectedDate):boolean {
        return habit.maxWeek > 0 &&
            this.dateService.isCurrentWeek(this.completedWeeklyHabits.date, selectedDate) &&
            this.completedWeeklyHabits.habits.filter((h) => h == habit.id).length >= habit.maxWeek;
    }

    timesCompletedThisMonth(habit:Habit):number {
        return this.completedMonthlyHabits.habits.filter(h => h === habit.id).length;
    }

    hasCompletedMonthlyMaxTimes(habit:Habit, selectedDate):boolean {
        return habit.maxMonth > 0 &&
            this.dateService.isCurrentMonth(this.completedMonthlyHabits.date, selectedDate) &&
            this.completedMonthlyHabits.habits.filter((h) => h == habit.id).length >= habit.maxMonth;
    }

    public handleSelectedDateChange(selectedDate) {
        this.completedDailyHabits = this.habitDataStoreService.loadCompletedDailyHabits(selectedDate);
        this.completedWeeklyHabits = this.habitDataStoreService.loadCompletedWeeklyHabits(selectedDate);
        this.completedMonthlyHabits = this.habitDataStoreService.loadCompletedMonthlyHabits(selectedDate);
    }
}
