export class User{
    constructor(
        public _id: string,
        public name: String,
        public username: String,
        public password: String,
        public email: String,
        public role: String,
        public image: String,
        public leagues: []
    ){}
}