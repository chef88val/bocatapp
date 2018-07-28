
export class itemPedido {
    public n: Number;
    public item: String;
    public id: String;
    public size: String;
    constructor(id:String, n: Number, item: string, size: String) {
      this.id = id;
      this.item = item;
      this.size = size;
      this.n = n;
    }
  }