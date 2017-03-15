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
      if(!this.userData){
          return 0;
      }
      return Math.floor((this.userData.reward / this.userData.goal.amount) * 100);
  }

}
