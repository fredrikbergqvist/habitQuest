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
    completedDailyHabits: {date: number, habits: Array<number>};
    completedWeeklyHabits: {date: number, habits: Array<number>};
    completedMonthlyHabits: {date: number, habits: Array<number>};
    userProfile: User;

    constructor(private dateService:DateService, private dataStore:DataStoreService) {
        this.loadCompletedDailyHabits();
        this.loadCompletedWeeklyHabits();
        this.loadCompletedMonthlyHabits();

        dateService.getSelectedDate().subscribe(() => this.handleSelectedDateChange())
    }

    getDailyHabitString():string{
        return this.DAILY_HABITS_STRING + this.dateService.selectedDate.getFullYear() + this.dateService.selectedDate.getMonth() + this.dateService.selectedDate.getDate();
    }
    getWeeklyHabitString():string{
        return this.WEEKLY_HABITS_STRING + this.dateService.selectedDate.getFullYear() + this.dateService.getWeekNumber();
    }
    getMonthlyHabitString():string{
        return this.MONTHLY_HABITS_STRING + this.dateService.selectedDate.getFullYear() + (this.dateService.selectedDate.getMonth() + 1);
    }

    saveUser(user:User){
        this.dataStore.saveData(this.USER_STRING, user);
    }

    loadUser(){
        if(!this.userProfile){
            this.userProfile = this.getUser();
        }
        return this.userProfile ? this.userProfile : null;
    }

    getUser():User{
        let userData:any = localStorage.getItem(this.USER_STRING);
        if(userData){
            userData = JSON.parse(userData);
        }
        return userData;
    }

    private addToCurrentTotal(habit:Habit){
        let user = this.loadUser();
        if(user){
            user.reward = user.reward + habit.reward;

            this.saveUser(user);
        }
    }
    private removeFromCurrentTotal(habit:Habit){
        let user = this.loadUser();
        if(user){
            user.reward = user.reward - habit.reward;

            this.saveUser(user);
        }
    }

    addHabit(habit:Habit): boolean {
        let habitAdded = false;
        if (habit.maxDay) {
            if (this.hasCompletedDailyMaxTimes(habit)) {
                return false;
            }
            this.completedDailyHabits.habits.push(habit.id);
            this.dataStore.saveData(this.getDailyHabitString(), this.completedDailyHabits);
            habitAdded = true;
        }

        if (habit.maxWeek) {
            if (this.hasCompletedWeeklyMaxTimes(habit)) {
                return false;
            }
            this.completedWeeklyHabits.habits.push(habit.id);
            this.dataStore.saveData(this.getWeeklyHabitString(), this.completedWeeklyHabits);
            habitAdded = true;
        }

        if (habit.maxMonth) {
            if (this.hasCompletedMonthlyMaxTimes(habit)) {
                return false;
            }
            this.completedMonthlyHabits.habits.push(habit.id);
            this.dataStore.saveData(this.getMonthlyHabitString(), this.completedMonthlyHabits);
            habitAdded = true;
        }

        if(habitAdded){
            this.addToCurrentTotal(habit);
        }

        return habitAdded;
    }

    removeHabit(habit:Habit){
        let firstIndexOf = -1;
        let habitRemoved = false;
        if (habit.maxDay) {
            firstIndexOf = this.completedDailyHabits.habits.indexOf(habit.id);
            if(firstIndexOf > -1){
                this.completedDailyHabits.habits.splice(firstIndexOf, 1);

                this.dataStore.saveData(this.getDailyHabitString(), this.completedDailyHabits);
                habitRemoved = true;
                firstIndexOf = -1;
            }
        }

        if (habit.maxWeek) {
            firstIndexOf = this.completedWeeklyHabits.habits.indexOf(habit.id);
            if(firstIndexOf > -1){
                this.completedWeeklyHabits.habits.splice(firstIndexOf, 1);
                this.dataStore.saveData(this.getWeeklyHabitString(), this.completedWeeklyHabits);
                habitRemoved = true;
                firstIndexOf = -1;
            }
        }

        if (habit.maxMonth) {
            firstIndexOf = this.completedMonthlyHabits.habits.indexOf(habit.id);
            if(firstIndexOf > -1){
                this.completedMonthlyHabits.habits.splice(firstIndexOf, 1);
                this.dataStore.saveData(this.getMonthlyHabitString(), this.completedMonthlyHabits);
                habitRemoved = true;
            }
        }

        if(habitRemoved){
            this.removeFromCurrentTotal(habit);
        }
    }

    hasCompletedMaxTimes(habit:Habit):boolean {
        return this.hasCompletedDailyMaxTimes(habit) ||
            this.hasCompletedWeeklyMaxTimes(habit) ||
            this.hasCompletedMonthlyMaxTimes(habit);
    }

    timesCompletedToday(habit:Habit):number{
        return this.completedDailyHabits.habits.filter(h => h === habit.id).length;
    }

    hasCompletedDailyMaxTimes(habit:Habit): boolean {
        return habit.maxDay > 0 &&
            this.dateService.isCurrentDay(this.completedDailyHabits.date) &&
            this.completedDailyHabits.habits.filter(h => h === habit.id).length >= habit.maxDay;
    }

    timesCompletedThisWeek(habit:Habit):number{
        return this.completedWeeklyHabits.habits.filter(h => h === habit.id).length;
    }

    hasCompletedWeeklyMaxTimes(habit:Habit): boolean {
        return habit.maxWeek > 0 &&
            this.dateService.isCurrentWeek(this.completedWeeklyHabits.date) &&
            this.completedWeeklyHabits.habits.filter((h) => h == habit.id).length >= habit.maxWeek;
    }

    timesCompletedThisMonth(habit:Habit):number{
        return this.completedMonthlyHabits.habits.filter(h => h === habit.id).length;
    }

    hasCompletedMonthlyMaxTimes(habit:Habit): boolean {
        return habit.maxMonth > 0 &&
            this.dateService.isCurrentMonth(this.completedMonthlyHabits.date) &&
            this.completedMonthlyHabits.habits.filter((h) => h == habit.id).length >= habit.maxMonth;
    }

    private loadCompletedDailyHabits():void {
        let dailyHabits = this.dataStore.loadData(this.getDailyHabitString());
        const selectedDate = this.dateService.selectedDate.getDate();
        if (!dailyHabits || dailyHabits.date != selectedDate) {
            dailyHabits = {
                habits: [],
                date:   selectedDate
            }
        }

        this.completedDailyHabits = dailyHabits;
        this.dataStore.saveData(this.getDailyHabitString(), this.completedDailyHabits);
    }

    private loadCompletedWeeklyHabits():void {
        let weeklyHabits = this.dataStore.loadData(this.getWeeklyHabitString());
        const currentWeek = this.dateService.getWeekNumber();
        if (!weeklyHabits || weeklyHabits.date != currentWeek) {
            weeklyHabits = {
                habits: [],
                date:   currentWeek
            }
        }

        this.completedWeeklyHabits = weeklyHabits;
        this.dataStore.saveData(this.getWeeklyHabitString(), this.completedWeeklyHabits);
    }

    private loadCompletedMonthlyHabits():void {
        let monthlyHabits = this.dataStore.loadData(this.getMonthlyHabitString());
        const currentMonth = this.dateService.selectedDate.getMonth() + 1;
        if (!monthlyHabits || monthlyHabits.date != currentMonth) {
            monthlyHabits = {
                habits: [],
                date:   currentMonth
            }
        }

        this.completedMonthlyHabits = monthlyHabits;
        this.dataStore.saveData(this.getMonthlyHabitString(), this.completedMonthlyHabits);
    }

    private handleSelectedDateChange() {
        this.loadCompletedDailyHabits();
        this.loadCompletedWeeklyHabits();
        this.loadCompletedMonthlyHabits();
    }
}
