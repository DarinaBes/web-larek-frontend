import { IDataProduct, IProduct } from "../../types";
import { IEvents } from "../base/events";

export class ProductModel implements IDataProduct {
    protected _items: IProduct[];
    selectedCard: IProduct;

    constructor(protected events: IEvents) {
        this._items = []
    }

    set items(data: IProduct[]) {
        this._items = data;
        this.events.emit('items:receive', data);
    }

    get items() {
        return this._items;
    }

    openCard(item: IProduct) {
        this.selectedCard = item;
        this.events.emit('modal:open', item)
    }
}