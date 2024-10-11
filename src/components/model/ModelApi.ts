import { IProduct, IBasketResult, IBasketOrder } from '../../types';
import { ApiListResponse, Api } from '../base/api'

export interface IModelApi {
    items: IProduct[];
    cdn: string;
    getProductList: () => Promise<IProduct[]>;
    postOrder: (order: IBasketOrder) => Promise<IBasketResult>;
}

export class ModelApi extends Api implements IModelApi {
    items: IProduct[];
    cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    // получить массив карточек с товарами с сервера
    getProductList(): Promise<IProduct[]> {
        return this.get('/product').then((data: ApiListResponse<IProduct>) =>
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image,
            }))
        );
        
    }

    // ответ по сделанному заказу
    postOrder(order: IBasketOrder): Promise<IBasketResult> {
        return this.post(`/order`, order).then((data: IBasketResult) => data);
    }
}
