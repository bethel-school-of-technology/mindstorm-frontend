import { Component } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {
  /** Show Jacob's bio */
  showJacob = false;
  /** Show Maria's bio */
  showMaria = false;
  /** Show Tavo's bio */
  showTavo = false;
  /** Show Marty's bio */
  showMarty = false;

  /** @ignore */
  constructor() {}
}
