import { Component, OnInit } from '@angular/core';
import { MlbGameService } from '../mlb-game.service';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { GamesOfDay } from '../models/games-of-day';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  date: Date = new Date();
  gamesOfDay: GamesOfDay;

  constructor(private mlbService: MlbGameService) { }

  ngOnInit() {

  }

  /**
   * Fetches all games for User entered date from mlb api
   */
  onSubmit() {
    this.mlbService.getGamesForDate(this.date)
      .subscribe(gamesResponse => {
        this.gamesOfDay = gamesResponse;
      });
  }
}
