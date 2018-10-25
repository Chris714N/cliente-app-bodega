export class Delivered {
    gettoken: any;
    constructor(
        public user_created: string ,
        public stock: string,
        public amount: number,
        public date_delivered: string,
        public date_returned: string,
        public name: string,
        public description_delivered: string,
        public description_returned: string,
        public role: string,
        public state: string
    ) { }
}
