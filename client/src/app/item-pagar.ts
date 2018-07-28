export class ItemPagar {
    public n: Number;
    public item: String;
    public id: String;
    public size: String;
    public dinero: Number;
    public pagado: Boolean;
    public user: String;
    constructor(id:String, n: Number, item: string, size: String, user: String,dinero: Number,pagado: Boolean) {
      this.id = id;
      this.item = item;
      this.size = size;
      this.n = n;
      this.dinero = dinero;
      this.pagado = pagado;
      this.user = user;
    }
}
