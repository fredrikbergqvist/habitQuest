import {Injectable} from '@angular/core';

@Injectable()
export class WindowService {
    private _window;

    constructor() {
        this._window = window;
    }

    getWindow(){
        return this._window;
    }
}
