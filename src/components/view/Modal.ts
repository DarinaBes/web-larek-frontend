import { IEvents } from "../base/events";

export interface IModal {
    open(): void;
    close(): void;
    render(): HTMLElement;
}

export class Modal implements IModal {
    protected _content: HTMLElement;
    protected modalContainer: HTMLElement;
    protected closeButton: HTMLButtonElement;
    
    constructor(modalContainer: HTMLElement, protected events: IEvents) {
        this.modalContainer = modalContainer;
        this.closeButton = modalContainer.querySelector('.modal__close') as HTMLButtonElement;
        this._content = modalContainer.querySelector('.modal__content') as HTMLElement;
        this.closeButton.addEventListener('click', this.close.bind(this));
        this.modalContainer.addEventListener('click', this.close.bind(this));
        this.setupModalContentClick();
    }

    // Метод для установки обработчика клика на контейнер модального окна
    private setupModalContentClick() {
        const modalContent = this.modalContainer.querySelector('.modal__container');
        if (modalContent) {
            modalContent.addEventListener('click', this.stopClickPropagation);
        }
    }

    // Метод для остановки распространения события клика
    private stopClickPropagation(event: MouseEvent) {
        event.stopPropagation();
    }

    // Установка контента в модальное окно
    set content(value: HTMLElement) {
        if (value) {
            this._content.replaceChildren(value);
        }
    }

    // Открытие модального окна
    open(): void {
        this.modalContainer.classList.add('modal_active');
        this.events.emit('modal:open');
    }

    // Закрытие модального окна
    close(): void {
        this.modalContainer.classList.remove('modal_active');
        this.content = null;
        this.events.emit('modal:close');
    }

    render(): HTMLElement {
        this._content;
        this.open();
        return this.modalContainer;
        
    }
}
