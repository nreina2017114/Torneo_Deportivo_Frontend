export class Match{
    constructor(
        public _id: string,
        public idMatch: Number,
        public idWinner: Number,
        public idLoser: Number,
        public goals: Number,
        public goalsf: Number,
        public matchCount: Number,
        public idTeam: String
    ){}
}