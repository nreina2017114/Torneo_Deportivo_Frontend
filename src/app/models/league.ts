export class League{
    constructor(
        public _id: string,
        public name: String,
        public image: String,
        public teams:[],
        public user: string
    ){}
}