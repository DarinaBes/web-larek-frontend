import { IEvents } from "../base/events";
import { IActions, IProduct } from "../../types";

export interface IBasketItem {
    basketItem: HTMLElement;
    basketItemIndex: HTMLElement;
    title: HTMLElement;
    price: HTMLElement;
    buttonBasketDelete: HTMLButtonElement;

    render(data: IProduct, item: number): HTMLElement;
}

export class BasketItem implements IBasketItem {
    basketItem: HTMLElement;
    basketItemIndex: HTMLElement;
    title: HTMLElement;
    price: HTMLElement;
    buttonBasketDelete: HTMLButtonElement;

    constructor(template: HTMLTemplateElement, protected events: IEvents, actions?: IActions) {
        this.basketItem = template.content.querySelector('.basket__item').cloneNode(true) as HTMLElement;
        this.basketItemIndex = this.basketItem.querySelector('.basket__item-index');
        this.title = this.basketItem.querySelector('.card__title');
        this.price = this.basketItem.querySelector('.card__price');
        this.buttonBasketDelete = this.basketItem.querySelector('.basket__item-delete');

        if (actions?.onClick) {
			this.buttonBasketDelete.addEventListener('click', actions.onClick);
		}
    }

    render(data: IProduct, item: number): HTMLElement {
        this.basketItemIndex.textContent = String(item);
        this.title.textContent = data.title;
        this.price.textContent = `${data.price} синапсов`;

        return this.basketItem;
    }
}
