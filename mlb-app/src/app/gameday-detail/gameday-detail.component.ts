import { Input, Component, OnInit } from '@angular/core';
import { Boxscore } from '../models/boxscore';

@Component({
  selector: 'app-gameday-detail',
  templateUrl: './gameday-detail.component.html',
  styleUrls: ['./gameday-detail.component.css']
})
export class GamedayDetailComponent implements OnInit {
  @Input() boxscore: Boxscore;
  constructor() { }

  ngOnInit() {
  }

}
