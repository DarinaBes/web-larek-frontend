import { IProduct, IBasket } from "../../types";

export class BasketModel implements IBasket {
    private _listProducts: IProduct[];

    constructor() {
        this._listProducts = [];
    }

    get listProducts() {
        return this._listProducts;
    }

    getCounterToBasket() {
        return this._listProducts.length;
    }

    getSummaProducts() {
        return this._listProducts.reduce((sum, product) => sum + product.price, 0);
    }

    setSelectedСard(data: IProduct) {
        this._listProducts.push(data);
    }

    deleteSelectedСard(item: IProduct) {
        const index = this._listProducts.indexOf(item);
        if (index >= 0) {
            this._listProducts.splice(index, 1);
        }
    }

    clearBasket() {
        this._listProducts = [];
    }
}
