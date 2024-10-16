import { IEvents } from "../base/events";

export interface IBasket {
    _basketHeaderButton: HTMLButtonElement;
    _basketHeaderCounter: HTMLElement;
    _basket: HTMLElement;
    _basketTitle: HTMLElement;
    _basketList: HTMLElement;
    _basketPrice: HTMLElement;
    _basketButton: HTMLButtonElement;

    renderBasketHeaderCounter(value: number): void;
    renderSumProducts(sumAll: number): void;
    render(): HTMLElement;
}

export class Basket implements IBasket {
    _basketHeaderButton: HTMLButtonElement;
    _basketHeaderCounter: HTMLElement;
    _basket: HTMLElement;
    _basketTitle: HTMLElement;
    _basketList: HTMLElement;
    _basketPrice: HTMLElement;
    _basketButton: HTMLButtonElement;

    constructor(template: HTMLTemplateElement, protected events: IEvents) {
        this._basket = template.content.querySelector('.basket').cloneNode(true) as HTMLElement;
        this._basketTitle = this._basket.querySelector('.modal__title')!;
        this._basketList = this._basket.querySelector('.basket__list')!;
        this._basketButton = this._basket.querySelector('.basket__button')!;
        this._basketPrice = this._basket.querySelector('.basket__price')!;
        this._basketHeaderButton = document.querySelector('.header__basket') as HTMLButtonElement;
        this._basketHeaderCounter = document.querySelector('.header__basket-counter') as HTMLElement;
        this._basketHeaderButton.addEventListener('click', () => { this.events.emit('basket:open') });
        this._basketButton.addEventListener('click', () => { this.events.emit('order:open') });

        this.itemsList = [];
    }

    set itemsList(items: HTMLElement[]) {
        if (items.length) {
            this._basketList.append(...items);
            this._basketButton.removeAttribute('disabled');
        } else {
            this._basketButton.setAttribute('disabled', 'disabled');
        }
    }
    render() {
        this._basketTitle.textContent = 'Корзина';
        return this._basket;
    }
    renderBasketHeaderCounter(value: number) {
        this._basketHeaderCounter.textContent = String(value);
    }
    renderSumProducts(sumAll: number) {
        this._basketPrice.textContent = String(sumAll + ' синапсов');
    }
}
