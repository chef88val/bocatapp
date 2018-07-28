export class Book {
    public _id: String;
    public user: String;
    public size: String;
    public item: String;
    constructor(_id:String, user: String,size: String,item: String){
        this.user = user;
        this.item = item;
        this.size = size;
    }
}
