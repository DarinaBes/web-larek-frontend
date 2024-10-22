import { IProduct, IBasketModel } from "../../types";

export class BasketModel implements IBasketModel {
    listBasket: IProduct[];

    constructor() {
        this.listBasket = [];
    }

    set listProducts(data: IProduct[]) {
        this.listBasket = data;
    }

    get listProducts() {
        return this.listBasket;
    }

    getCounterToBasket() {
        return this.listBasket.length;
    }

    getSummaProducts() {
        return this.listBasket.reduce((sum, product) => sum + product.price, 0);
    }

    setSelectedСard(data: IProduct) {
        const existingCard = this.listBasket.find(card => card.id === data.id)
        if (!existingCard) {
            this.listBasket.push(data);
        }
    }

    deleteSelectedСard(item: IProduct) {
        this.listBasket = this.listBasket.filter(product => product.id !== item.id);
    }
    

    clear() {
        this.listBasket = [];
    }
}
