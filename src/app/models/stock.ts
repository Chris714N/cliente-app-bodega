export class Stock {
    constructor(
        public user_created: string,
        public name: string,
        public description: string,
        public amount: number,
        public code: string,
        public date_created: string,
        public role: string,
        public image: string
    ) {}
}
