// Интерфейс для работы с карточкой товара
export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

// Данные карточки, используемые в корзине
type TProductInfo = Pick<IProduct, 'title' | 'price'>

// Интерфейс для работы с корзиной и формой
export interface IBasket {
	items: IProduct[];
	payment: TBasketPayment;
	address: string;
	email: string;
	phone: string;
    total: string | number;
}

// Интерфейс для работы с карточками товаров
export interface IDataProduct {
    items: IProduct[];
    previewCard: IProduct;
    selectedСard(item: IProduct): void;
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
} 

// Ошибки формы
export type FormErrors = Partial<Record<keyof IBasket, string>>;

// Интерфейс для работы с корзиной
export interface IBasketModel {
    listProducts: IProduct[];
    getCounterToBasket: () => number;
    getSummaProducts: () => number;
    setSelectedСard(data: IProduct): void;
    deleteSelectedСard(item: IProduct): void;
    clearBasket(): void
}

