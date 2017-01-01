import {Injectable} from '@angular/core';

@Injectable()
export class DataStoreService {

    constructor() {
    }

    saveData(key: string, data: any): void {
        this.saveToLocalStorage(key, data);
    }

    loadData(key: string): any {
        return this.loadFromLocalStorage(key);
    }

    private saveToLocalStorage(key: string, data: any): void {
        localStorage.setItem(key, JSON.stringify(data));
    }

    private loadFromLocalStorage(key: string): any {
        return JSON.parse(localStorage.getItem(key))
    }
}
