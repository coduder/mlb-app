export class Team {
    constructor(
        public teamName: string,
        public teamCode: string,
        public teamErrors: number,
        public teamHits: number,
        public teamRuns: number,
        public innings: number[],
        public batters: any[]
    ) {}
}
