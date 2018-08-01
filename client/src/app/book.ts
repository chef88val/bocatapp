export class Book {
    public _id: String;
    public user: String;
    public size: String;
    public item: String;
    public extras: any;
    constructor(_id: String, user: String, size: String, item: String, extras?: any) {
        this.user = user;
        this.item = item;
        this.size = size;
        this.extras = extras || [];
    }
}
