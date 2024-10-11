import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { CDN_URL, API_URL } from './utils/constants';
import { ModelApi } from './components/model/ModelApi';
import { IFormModel, IProduct } from './types';
import { ProductModel } from './components/model/ProductModel';
import { BasketModel } from './components/model/BasketModel';
import { FormModel } from './components/model/FormModel';

const events = new EventEmitter();
const api = new ModelApi(CDN_URL, API_URL);

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
    console.log(eventName, data);
})

// Все шаблоны
const cardCatalogTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const cardPreviewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const cardBasketTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
const orderTemplate = document.querySelector('#order') as HTMLTemplateElement;
const contactsTemplate = document.querySelector('#contacts') as HTMLTemplateElement;
const successTemplate = document.querySelector('#success') as HTMLTemplateElement;

// Переиспользуемые части интерфейса
const dataModel = new ProductModel(events);





api.getProductList()
.then(function (data: IProduct[]) {
    dataModel.items = data;
})
.catch(error => console.log(error))