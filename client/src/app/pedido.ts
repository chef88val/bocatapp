export class Pedido {
    public title: String;
    public items: any =[];
    public caller: any = {};
    public status: String;
    public visible: Boolean = true;

    constructor(title: String, caller: any){
        this.title = title;
        this.caller = caller;
    }
}
