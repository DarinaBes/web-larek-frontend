import { IEvents } from '../base/events';
import { IOrderForms, FormErrors, TBasketPayment } from '../../types/index';

export class FormModel implements IOrderForms {
    payment: TBasketPayment;
    email: string;
    phone: string;
    address: string;
    errors: string[] = [];

    constructor(protected events: IEvents) {
        this.payment = 'cash';
        this.email = '';
        this.phone = '';
        this.address = '';
    }

    orderData(field: string, value: string): void {
        if (field === 'address') {
            this.address = value;
        } else if (field === 'email') {
            this.email = value;
        } else if (field === 'phone') {
            this.phone = value;
        }
        
        if (this.checkValidate()) {
            this.events.emit('order:ready', this.orderLot());
        }
    }

    checkValidate(): boolean {
        const errors: FormErrors = {};
        if (!this.address) {
            errors.address = 'Укажите адрес';
        }
        if (!this.email) {
            errors.email = 'Укажите email';
        }
        if (!this.phone) {
            errors.phone = 'Укажите телефон';
        } else if (this.phone.startsWith('8')) {
            this.phone = '+7' + this.phone.slice(1);
        }

        this.errors = Object.values(errors);
        this.events.emit('formErrors:change', errors);
        return this.errors.length === 0;
    }

    orderLot() {
        return {
            payment: this.payment,
            email: this.email,
            phone: this.phone,
            address: this.address,
        }
    }
}

