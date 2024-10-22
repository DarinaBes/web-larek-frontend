// Интерфейс для работы с карточкой товара
export interface IProduct {
	id: string;
	image: string;
	title: string;
    description: string;
	category: string;
	price: number | null;
    button: HTMLElement;
}

// слушатель для событий
export interface IActions {
    onClick: (event: MouseEvent) => void;
}

// Интерфейс для работы с карточками товаров
export interface IDataProduct {
    items: IProduct[];
    openCard(item: IProduct): void ;
    selectedCard: IProduct;
}

// Интерфейс для работы с заказом из корзины
export interface IBasketOrder {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}

// Данные для выбора оплаты
export type TBasketPayment = 'cash' | 'card';

// Результат заказа в корзине
export interface IBasketResult {
    id: string;
    total: number;
}

// Интерфейс для работы с формами
export interface IFormModel {
    [key: string]: any
    payment: TBasketPayment;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
} 

// Ошибки формы
export interface IOrderForms extends IFormModel {
    errors: string[];
}

export type FormErrors = Partial<Record<keyof IOrderForms, string>>;

// Интерфейс для работы с корзиной
export interface IBasketModel {
    listProducts: IProduct[];
}

export interface ICard {
    render(data: IProduct, itemSelected?: boolean): HTMLElement;
}
