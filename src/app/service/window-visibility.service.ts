import {Injectable} from '@angular/core';
import {WindowService} from './window.service';

@Injectable()
export class WindowVisibilityService {
    private fArr = [];

    constructor(private windowService:WindowService) {
        this.fArr = [];
    }

    monitorVisibility():void{
        document.addEventListener("visibilitychange", () => this.handleVisibilityChange(), false);
    }

    register(func:any):void{
        this.fArr.push(func);
    }

    private handleVisibilityChange():void {
        if (document.hidden) {
            return;
        }

        this.windowService.getWindow().location.reload();
    }
}
