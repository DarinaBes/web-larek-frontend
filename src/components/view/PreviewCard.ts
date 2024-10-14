import { IActions, IProduct } from "../../types";
import { Card } from "./Card";
import { IEvents } from "../base/events";

export interface ICard {
    render(data: IProduct): HTMLElement;
}

export class PreviewCard extends Card implements ICard {
    _text: HTMLElement;
    _button: HTMLElement;

    constructor(template: HTMLTemplateElement, protected events: IEvents, actions?: IActions) {
        super(template, events, actions);
        this._text = this._cardElement.querySelector('.card__text') as HTMLElement;
        this._button = this._cardElement.querySelector('.card__button') as HTMLElement;

        this._button.addEventListener('click', () => {
            if (this._button.hasAttribute('disabled')) {
                return;
            }
            this.events.emit('card:inBasket');
        });
    }

    private buttonState(price: number | string): void {
        if (price === null || price === 'Бесценно') {
            this._button.setAttribute('disabled', 'true');
            this._button.textContent = 'Не продается';
        } else {
            this._button.removeAttribute('disabled');
            this._button.textContent = 'Купить';
        }
    }

    render(data: IProduct): HTMLElement {
        this._categoryElement.textContent = data.category;
        this.category = data.category;
        this.setText(this._titleElement, data.title);
        this._imageElement.src = data.image;
        this._imageElement.alt = data.title;
        this.setText(this._priceElement, this.formatPrice(data.price));
        this._text.textContent = data.description;
        this.buttonState(data.price);
        return this._cardElement;
    }
    
}

