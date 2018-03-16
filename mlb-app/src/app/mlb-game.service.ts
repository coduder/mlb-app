import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GamesOfDay } from './models/games-of-day';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { GameSummary } from './models/game-summary';
import { Linescore } from './models/linescore';
import { Boxscore } from './models/boxscore';
import { Team } from './models/team';

@Injectable()
export class MlbGameService {
  mlbAPIUrl = 'http://gd2.mlb.com';

  constructor(private http: HttpClient) { }

  /**
   * Fetches game data for specified date from MLB api.
   *
   * @param date The date to fetch games for
   * @returns fully initialized gamesOfDay object
   */
  getGamesForDate(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // zero based month index
    const day = date.getDate();

    console.log('Day: ' + day + ' Month: ' + month + ' Year: ' + year);

    let url = this.mlbAPIUrl;
    url += '/components/game/mlb'
        + '/year_' + year
        + '/month_' + ((month < 10) ? '0' + month : month)
        + '/day_' + ((day < 10) ? '0' + day : day)
        + '/master_scoreboard.json';

    return this.http.get(url)
      .map(res => res['data']['games'])
      .map(gamesRes => {
        console.log('full gameDay JSON data from api');
        console.log(gamesRes);
        let games: GameSummary[] = [];

        // Only set game data if games occurred
        if ( gamesRes['game'] ) {
          // JSON of individual game level
          let indvGameLevelRes = gamesRes['game'];
          // ensures that days with only one game are still stored in an array so GameSummary loop works below
          indvGameLevelRes = ( !indvGameLevelRes.length ) ? [indvGameLevelRes] : indvGameLevelRes;

          // build array of GameSummary objects from given day
          for (let i = 0; i < indvGameLevelRes.length; i++) {
            // creates Linescore only if one exists
            if (indvGameLevelRes[i]['linescore']) {
              const linescore = new Linescore(
                indvGameLevelRes[i]['linescore']['e'],
                indvGameLevelRes[i]['linescore']['r']);

              games[i] = new GameSummary(
                indvGameLevelRes[i]['home_team_name'],
                indvGameLevelRes[i]['away_team_name'],
                indvGameLevelRes[i]['status']['status'],
                indvGameLevelRes[i]['game_data_directory'],
                linescore,
                ((+linescore.result.home > +linescore.result.away) // set winner
                  ? 'h'
                  : 'a'
                )
              );
              // no line score exists, therefore no winner
            } else {
              games[i] = new GameSummary(
                indvGameLevelRes[i]['home_team_name'],
                indvGameLevelRes[i]['away_team_name'],
                indvGameLevelRes[i]['status']['status'],
                indvGameLevelRes[i]['game_data_directory'],
                null,
                null
              );
            }
          }
        // no games occurred
        } else {
          games = null;
        }

        return new GamesOfDay(
          gamesRes['day'],
          gamesRes['month'],
          gamesRes['year'],
          gamesRes['next_day_date'],
          games
        );
      });
  }

  /**
   * Fetches detailed individual game information from api. The directory path is a property of a game object
   * @param dirUrl Detail directory path from domain
   */
  getGameDataDetails(dirUrl) {
    return this.http.get(this.mlbAPIUrl + dirUrl + '/boxscore.json')
      .map(gameData => gameData['data']['boxscore'])
      .map(boxscoreRes => {
        console.log('Full indv game details JSON data from api');
        console.log(boxscoreRes);
        const homeTeam = this.makeTeam(boxscoreRes, 'home');
        const awayTeam = this.makeTeam(boxscoreRes, 'away');
        return new Boxscore(homeTeam, awayTeam);
      });
  }
  /**
   * Returns either a home or away team object depending on homeAway param
   * @param boxscore boxscore response object from api
   * @param homeAway either 'home' or 'away' depending on team to build
   */
  private makeTeam(boxscore, homeAway: string) {
    const linescore = boxscore['linescore'];
    return new Team(
      boxscore[homeAway + '_sname'],
      boxscore[homeAway + '_team_code'],
      linescore[homeAway + '_team_errors'],
      linescore[homeAway + '_team_hits'],
      linescore[homeAway + '_team_runs'],
      linescore['inning_line_score']
        .map(inning => inning[homeAway + '']),
      boxscore['batting']
        .map(battingArray => battingArray[(homeAway === 'home') ? 0 : 1])
    );
  }

}

