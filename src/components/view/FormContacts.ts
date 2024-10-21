import { IEvents } from "../base/events";

export class FormContacts {
    formContacts: HTMLFormElement;
    buttonSubmit: HTMLButtonElement;
    inputs: HTMLInputElement[];
    formErr: HTMLElement;

    constructor(template: HTMLTemplateElement, protected events: IEvents) {
        this.formContacts = template.content.querySelector('.form').cloneNode(true) as HTMLFormElement;
        this.inputs = Array.from(this.formContacts.querySelectorAll('.form__input'));
        this.buttonSubmit = this.formContacts.querySelector('.button');
        this.formErr = this.formContacts.querySelector('.form__errors');

        this.inputs.forEach(item => {
            item.addEventListener('input', (event) => {
                const target = event.target as HTMLInputElement;
                const field = target.name;
                const value = target.value;
                this.events.emit(`contacts:change`, { field, value });
            })
        })

        this.formContacts.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            this.events.emit('success:open');
        });
    }

    set valid(value: boolean) {
        this.buttonSubmit.disabled = !value;
    }

    render() {
        return this.formContacts
    }
}