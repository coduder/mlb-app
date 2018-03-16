import { Input, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GamesOfDay } from '../models/games-of-day';
import { GameSummary } from '../models/game-summary';
import { MlbGameService } from '../mlb-game.service';
import { Boxscore } from '../models/boxscore';

@Component({
  selector: 'app-gameday-summary',
  templateUrl: './gameday-summary.component.html',
  styleUrls: ['./gameday-summary.component.css']
})
export class GamedaySummaryComponent implements OnInit {
  @Input() games: GamesOfDay;
  date: Date;
  showDetails = false; // indicator if user has clicked on game and wants to see details
  boxscore: Boxscore;

  constructor(private router: Router, private mlbService: MlbGameService) { }

  ngOnInit() {
    this.date = new Date(+this.games.year, +this.games.month, +this.games.day);
  }

  showGameDetails(game: GameSummary) {
    this.showDetails = true;
    this.mlbService.getGameDataDetails(game.gameDataDirectoryUrl)
      .subscribe(boxscore => this.boxscore);
  }

}
