import { IEvents } from '../base/events';
import { IOrderForms, FormErrors, TBasketPayment } from '../../types/index';

export class FormModel implements IOrderForms {
    payment: TBasketPayment;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
    errors: string[] = [];

    constructor(protected events: IEvents) {
        this.payment = 'cash'; // Значение по умолчанию
        this.email = '';
        this.phone = '';
        this.address = '';
        this.total = 0;
        this.items = [];
    }

    orderAddress(field: string, value: string): void {
        if (field === 'address') {
            this.address = value;
        }

        if (this.checkValidateOrder()) {
            this.events.emit('order:ready', this.orderLot());
        }
    }

    checkValidateOrder(): boolean {
        const regexp = /^[а-яА-ЯёЁa-zA-Z0-9\s\/.,-]{7,}$/;
        const errors: FormErrors = {};

        if (!this.address) {
            errors.address = 'Укажите адрес';
        } else if (!regexp.test(this.address)) {
            errors.address = 'Укажите полный адрес';
        } else if (!this.payment) {
            errors.payment = 'Выберите способ оплаты';
        }

        this.errors = Object.values(errors);
        this.events.emit('formErrors:address', errors);
        return this.errors.length === 0;
    }

    orderData(field: string, value: string): void {
        if (field === 'email') {
            this.email = value;
        } else if (field === 'phone') {
            this.phone = value;
        }

        if (this.checkValidateContacts()) {
            this.events.emit('order:ready', this.orderLot());
        }
    }

    checkValidateContacts(): boolean {
        const regexpEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const regexpPhone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10}$/;
        const errors: FormErrors = {};

        if (!this.email) {
            errors.email = 'Укажите email';
        } else if (!regexpEmail.test(this.email)) {
            errors.email = 'Некорректный адрес электронной почты';
        }

        // Преобразование номера телефона
        if (this.phone.startsWith('8')) {
            this.phone = '+7' + this.phone.slice(1);
        }

        if (!this.phone) {
            errors.phone = 'Укажите телефон';
        } else if (!regexpPhone.test(this.phone)) {
            errors.phone = 'Некорректно введен номер телефона';
        }

        this.errors = Object.values(errors);
        this.events.emit('formErrors:change', errors);
        return this.errors.length === 0;
    }

    orderLot(): object {
        return {
            payment: this.payment,
            email: this.email,
            phone: this.phone,
            address: this.address,
            total: this.total,
            items: this.items,
        };
    }
}


