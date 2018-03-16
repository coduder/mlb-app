import { GameSummary } from './game-summary';

/**
 * Set of games played on a specific day
 */
export class GamesOfDay {
    constructor(
        public day: string,
        public month: string,
        public year: string,
        public nextDayDate: string,    // next day games were played on (for quickly moving through api)
        public games: GameSummary[],          // all games played on this day
    ) {}

}
