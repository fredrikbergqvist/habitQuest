import {Component, OnInit} from '@angular/core';

@Component({
    selector:    'app-navigation',
    templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
    private navigationOpen = false;

    constructor() {
    }

    ngOnInit() {}

    openNavigation(){
        this.navigationOpen = !this.navigationOpen;
    }
}
