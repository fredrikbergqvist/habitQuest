import {Injectable} from '@angular/core';
import {DataStoreService} from './data-store.service';
import {User} from '../models/user';

@Injectable()
export class UserDataStoreService {
    private USER_STRING = 'userHabits';

    constructor(private dataStore:DataStoreService) { }

    saveUser(user:User) {
        this.dataStore.saveData(this.USER_STRING, user);
    }

    getUser():User {
        let userData:any = localStorage.getItem(this.USER_STRING);
        if (userData) {
            userData = JSON.parse(userData);
        }
        return userData;
    }
}
