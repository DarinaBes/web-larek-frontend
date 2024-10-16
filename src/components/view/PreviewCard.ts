import { IActions, IProduct, ICard } from "../../types";
import { Card } from "./Card";
import { IEvents } from "../base/events";

export class PreviewCard extends Card implements ICard {
    text: HTMLElement;
    button: HTMLElement;

    constructor(template: HTMLTemplateElement, protected events: IEvents, actions?: IActions) {
        super(template, events, actions);
        this.text = this._cardElement.querySelector('.card__text') as HTMLElement;
        this.button = this._cardElement.querySelector('.card__button') as HTMLElement;

        this.button.addEventListener('click', () => {
            if (this.button.hasAttribute('disabled')) {
                return;
            }
            this.events.emit('card:inBasket');
        });
    }

    private buttonState(price: number | string): void {
        if (price === null || price === 'Бесценно') {
            this.button.setAttribute('disabled', 'true');
            this.button.textContent = 'Не продается';
        } else {
            this.button.removeAttribute('disabled');
            this.button.textContent = 'Купить';
        }
    }

    render(data: IProduct): HTMLElement {
        this.categoryElement.textContent = data.category;
        this.categoryCard = data.category;
        this._imageElement.src = data.image;
        this._imageElement.alt = data.title;
        this.setText(this._titleElement, data.title);
        this.setText(this._priceElement, this.formatPrice(data.price));
        this.text.textContent = data.description;
        this.buttonState(data.price);
        return this._cardElement;
    }
    
}

