import { IEvents } from "../base/events";

export class FormSuccess {
    formSuccess: HTMLElement;
    buttonClose: HTMLButtonElement;
    description: HTMLElement;

    constructor(template: HTMLTemplateElement, protected events: IEvents) {
        this.formSuccess = template.content.querySelector('.order-success').cloneNode(true) as HTMLElement;
        this.buttonClose = this.formSuccess.querySelector('.order-success__close');
        this.description = this.formSuccess.querySelector('.order-success__description');
        this.buttonClose.addEventListener('click', () => { events.emit('success:close') });
    }

    render(total: number): HTMLElement {
        this.description.textContent = `Списано ${total} синапсов`;
        return this.formSuccess;
    }

}