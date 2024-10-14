import { IProduct } from "../../types";
import { IEvents } from "../base/events";

interface IActions {
    onClick: (event: MouseEvent) => void;
}

export interface ICard {
    render(data: IProduct): HTMLElement;
}

export class Card implements ICard {
    protected _cardElement: HTMLElement;
    protected _categoryElement: HTMLElement;
    protected _titleElement: HTMLElement;
    protected _imageElement: HTMLImageElement;
    protected _priceElement: HTMLElement;
    protected _colorElement = <Record<string, string>>{
        "софт-скил": "soft",
        "хард-скил": "hard",
        "кнопка": "button",
        "дополнительное": "additional",
        "другое": "other",
    }

    constructor(template: HTMLTemplateElement, protected events: IEvents, actions?: IActions) {
        this._cardElement = template.content.querySelector('.card')!.cloneNode(true) as HTMLElement;
        this._categoryElement = this._cardElement.querySelector('.card__category')!;
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

    set category(value: string | null) {
        if (value) {
            this._categoryElement.textContent = value;
            this._categoryElement.className = `card__category card__category_${this._colorElement[value] || 'other'}`;
        }
    }
    

    protected formatPrice(value: number | null): string {
        return value === null ? 'Бесценно' : `${value} синапсов`;
    }

    render(data: IProduct): HTMLElement {
        this.category = data.category;
        this.setText(this._titleElement, data.title);
        this._imageElement.src = data.image;
        this._imageElement.alt = data.title;
        this.setText(this._priceElement, this.formatPrice(data.price));
        return this._cardElement;
    }
}
