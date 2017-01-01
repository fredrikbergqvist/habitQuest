import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {User} from '../models/user';

@Component({
    selector:    'app-register-user',
    templateUrl: './register-user.component.html'
})
export class RegisterUserComponent implements OnInit {
    @Output() onChange:EventEmitter<User>;
    model:User;

    constructor() {
        this.onChange = new EventEmitter();
    }

    ngOnInit() {
        this.model = new User();
    }

    onSubmit() {
        this.onChange.emit(this.model);
    }

}
