import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./_progress.component.scss']
})
export class ProgressComponent {
    @Input() userData;

  constructor() { }

  percentToGo(){
      return Math.floor((this.userData.reward / this.userData.goal.amount) * 100);
  }

}
