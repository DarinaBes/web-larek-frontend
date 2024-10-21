import { IEvents } from "../base/events";

export class FormOrder {
    formOrder: HTMLFormElement;
    buttonOrder: HTMLButtonElement;
    buttonAlt: HTMLButtonElement[];
    formErr: HTMLElement;

    constructor(template: HTMLTemplateElement, protected events: IEvents) {
        this.formOrder = template.content.querySelector('.form').cloneNode(true) as HTMLFormElement;
        this.buttonOrder = this.formOrder.querySelector('.order__button');
        this.buttonAlt = Array.from(this.formOrder.querySelectorAll('.button_alt'));
        this.formErr = this.formOrder.querySelector('.form__errors');

        this.buttonAlt.forEach(item => {
            item.addEventListener('click', () => {
                this.paymentChoose = item.name;
                events.emit('order:payment', item);
            });
        });

        this.formOrder.addEventListener('input', (event: Event) => {
            const target = event.target as HTMLInputElement;
            const field = target.name;
            const value = target.value;
            this.events.emit(`order:change`, { field, value });
        });

        this.formOrder.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            this.events.emit('contacts:open');
        });
    }

    //обводка вокруг выбранного метода оплаты
    set paymentChoose(payment: string) {
        this.buttonAlt.forEach(item => {
            item.classList[item.name === payment ? 'add' : 'remove']('button_alt-active');
        });
    }
    
    set valid(value: boolean) {
        this.buttonOrder.disabled = !value;
    }

    render() {
        return this.formOrder
    }
}