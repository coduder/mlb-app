import { Linescore } from './linescore';

/**
 * Most relevant information for a specific game
 */
export class GameSummary {
    constructor(
        public homeTeamName: string,
        public awayTeamName: string,
        public status: string,
        public gameDataDirectoryUrl: string,
        public lineScore: Linescore,
        public winner: string
     ) {}
}
