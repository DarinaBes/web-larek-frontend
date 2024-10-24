import { IEvents } from "../base/events";

interface IPage {
    counter: number;
    locked: boolean;
    renderBasketHeaderCounter(value: number): void;
}

export class Page implements IPage {
    protected _counter: HTMLElement;
    protected _basketHeaderCounter: HTMLElement;
    protected _pageWrapper: HTMLElement;


    constructor(container: HTMLElement, protected events: IEvents) {
        this._basketHeaderCounter = container.querySelector('.header__basket-counter');
        this._pageWrapper = document.querySelector('.page__wrapper') as HTMLElement;
    }

    set counter(value: number) {
        this._basketHeaderCounter.textContent = String(value);
    }

     // Блокировка прокрутки страницы
    set locked(value: boolean) {
        if (value) {
            this._pageWrapper.classList.add('page__wrapper_locked');
        } else {
            this._pageWrapper.classList.remove('page__wrapper_locked');
        }
    }
    
    renderBasketHeaderCounter(value: number) {
        this._basketHeaderCounter.textContent = value.toString();
    }
}