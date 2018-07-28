export class Pedido {
    public _id: String;
    public title: String;
    public items: any =[];
    public users: any =[];
    public caller: any = {};
    public status: String;
    public visible: Boolean = true;

    constructor(title: String, caller: any){
        this.title = title;
        this.caller = caller;
    }
}
