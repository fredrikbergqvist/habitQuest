import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {HabitItemComponent} from './habit-item/habit-item.component';
import {HabitDataService} from './service/habit-data.service';
import {UserDataService} from './service/user-data.service';
import {HabitGroupComponent} from './habit-group/habit-group.component';
import {HttpService} from './service/http.service';
import {RegisterUserComponent} from './register-user/register-user.component';
import {DateService} from './service/date.service';
import {DataStoreService} from './service/data-store.service';

@NgModule({
    declarations: [
        AppComponent,
        HabitItemComponent,
        HabitGroupComponent,
        RegisterUserComponent
    ],
    imports:      [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers:    [
        HabitDataService,
        UserDataService,
        HttpService,
        DateService,
        DataStoreService
    ],
    bootstrap:    [AppComponent]
})
export class AppModule {
}
