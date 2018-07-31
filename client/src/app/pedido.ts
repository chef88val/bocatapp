import { Moment } from "moment";

export class Pedido {
    public _id: String;
    public title: String;
    public items: any = [];
    public users: any = [];
    public caller: any = {};
    public status: String = '';
    public visible: Boolean = true;
    public timeChangeSatus: Moment;

    constructor(_id?: String, title?: String, caller?: any, status?: String) {
        this._id = _id;
        this.title = title;
        this.caller = caller;
        this.status = status;
    }
}
