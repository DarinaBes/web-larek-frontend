import { IProduct, IActions, ICard } from "../../types";
import { IEvents } from "../base/events";

export class Card implements ICard {
    protected _cardElement: HTMLElement;
    protected categoryElement: HTMLElement;
    protected _titleElement: HTMLElement;
    protected _imageElement: HTMLImageElement;
    protected _priceElement: HTMLElement;
    protected colorElement = <Record<string, string>>{
        "софт-скил": "soft",
        "хард-скил": "hard",
        "кнопка": "button",
        "дополнительное": "additional",
        "другое": "other",
    }

    constructor(template: HTMLTemplateElement, protected events: IEvents, actions?: IActions) {
        this._cardElement = template.content.querySelector('.card')!.cloneNode(true) as HTMLElement;
        this.categoryElement = this._cardElement.querySelector('.card__category')!;
        this._titleElement = this._cardElement.querySelector('.card__title')!;
        this._imageElement = this._cardElement.querySelector('.card__image') as HTMLImageElement;
        this._priceElement = this._cardElement.querySelector('.card__price')!;

        if (actions?.onClick) {
            this._cardElement.addEventListener('click', actions.onClick);
        }
    }

    protected setText(element: HTMLElement, value: unknown): void {
        if (element) {
            element.textContent = String(value);
        }
    }

    set categoryCard(value: string) {
        if (value) {
            this.categoryElement.textContent = value;
            this.categoryElement.className = `card__category card__category_${this.colorElement[value]}`;
        }
    }
    
    

    protected formatPrice(value: number | null): string {
        return value === null ? 'Бесценно' : `${value} синапсов`;
    }

    render(data: IProduct): HTMLElement {
        this.categoryElement.textContent = data.category;
        this.categoryCard = data.category;
        this._imageElement.src = data.image;
        this._imageElement.alt = data.title;
        this.setText(this._titleElement, data.title);
        this.setText(this._priceElement, this.formatPrice(data.price));
        return this._cardElement;
    }
}
