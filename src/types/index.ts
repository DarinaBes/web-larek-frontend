
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

// Данные карточки, используемые в корзине
type TProductInfo = Pick<IProduct, 'title' | 'price'>

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
    total: string | number;
}

// Типы для формы заказа, шаги
export type TBasketStep = 'order' | 'contacts';

// Интерфейс для работы с формами
export interface IFormModel {
    payment: TBasketPayment;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
    checkValidateOrder(): boolean;
    checkValidateContacts(): boolean;
    orderLot(): object;
    orderAddress(field: string, value: string): void
    orderData(field: string, value: string): void
} 

// Ошибки формы
export interface IOrderForms extends IFormModel {
    errors: string[];
}

export type FormErrors = Partial<Record<keyof IOrderForms, string>>;

// Интерфейс для работы с корзиной
export interface IBasketModel {
    listProducts: IProduct[];
    getCounterToBasket: () => number;
    getSummaProducts: () => number;
    setSelectedСard(data: IProduct): void;
    deleteSelectedСard(item: IProduct): void;
    clearBasket(): void
}

export interface ICard {
    render(data: IProduct, itemSelected?: boolean): HTMLElement;
}
