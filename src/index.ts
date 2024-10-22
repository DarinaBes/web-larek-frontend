import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { CDN_URL, API_URL } from './utils/constants';
import { ModelApi } from './components/model/ModelApi';
import { IFormModel, IOrderForms, IProduct, IBasketOrder } from './types';
import { ProductModel } from './components/model/ProductModel';
import { Card } from './components/view/Card';
import { Modal } from './components/view/Modal';
import { PreviewCard } from './components/view/PreviewCard';
import { BasketModel } from './components/model/BasketModel';
import { Basket } from './components/view/Basket';
import { BasketItem } from './components/view/BasketItem';
import { FormModel } from './components/model/FormModel';
import { FormOrder } from './components/view/FormOrder';
import { FormContacts } from './components/view/FormContacts';
import { FormSuccess } from './components/view/FormSuccess';

const events = new EventEmitter();
const api = new ModelApi(CDN_URL, API_URL);

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
const modal = new Modal(document.querySelector('#modal-container') as HTMLTemplateElement, events);
const basketModel = new BasketModel();
const basket = new Basket(basketTemplate, events);
const formModel = new FormModel(events) as IFormModel;
const order = new FormOrder(orderTemplate, events);
const contacts = new FormContacts(contactsTemplate, events);
const success = new FormSuccess(successTemplate, events);

function renderCards() {
    const galleryElement = document.querySelector<HTMLElement>('.gallery');
    dataModel.items.forEach(item => {
        const card = new Card(cardCatalogTemplate, events, {
            onClick: () => events.emit('card:select', item)
        });
        galleryElement.append(card.render(item));
    });
}
// Выводим карточки на страницу
events.on('items:receive', renderCards);

// Получить id карточки по которой кликнули
events.on('card:select', (item: IProduct) => { dataModel.openCard(item) });

// Открываем модальное окно карточки товара
events.on('modal:open', (data: IProduct) => {
    const cardPreview = new PreviewCard(cardPreviewTemplate, events);
    if (data) {
        const itemSelected = !!basketModel.listProducts.find(item => item.id === data.id)
        modal.content = cardPreview.render(data, itemSelected);
        modal.render();
    }
});
// Открываем модальное окно корзины
events.on('basket:open', () => {
    basket.renderSumProducts(basketModel.getSummaProducts());
    let i = 0;
    const itemsList = basketModel.listProducts.map((item) => {
        const basketItem = new BasketItem(cardBasketTemplate, events, { onClick: () => events.emit('card:delete', item) });
        i += 1;
        return basketItem.render(item, i);
    });
    basket.items = itemsList;
    modal.content = basket.render();
    modal.render();
});
// Добавить карточку в корзину
events.on('card:inBasket', () => {
    basketModel.setSelectedСard(dataModel.selectedCard);
    basket.renderBasketHeaderCounter(basketModel.getCounterToBasket()); 
    modal.close();
    renderCards()
});
// Удалить карточку из корзины
events.on('card:delete', (item: IProduct) => {
    basketModel.deleteSelectedСard(item);
    basket.renderBasketHeaderCounter(basketModel.getCounterToBasket());
    basket.renderSumProducts(basketModel.getSummaProducts());
    basketModel.deleteSelectedСard(item)// Очищаем старые элементы корзины
    basket.items = basketModel.listBasket.map((currentItem, index) => {
        const basketItem = new BasketItem(cardBasketTemplate, events, {
            onClick: () => events.emit('card:delete', currentItem)
        });
        return basketItem.render(currentItem, index);
    });
    // Добавляем новые элементы в модальное окно
    modal.content = basket.render(); 
    modal.render();
});
// Открываем модальное окно Заказ с адресом
events.on('order:open', () => {
    modal.content = order.render();
    modal.render();
    formModel.items = basketModel.listBasket.map(item => item.id); 
    events.on('order:payment', (button: HTMLButtonElement) => { 
        order.paymentChoose = button.name
        formModel.checkValidate()
    })
    events.on('order:change', (event: { field: string, value: string }) => { 
        formModel[event.field] = event.value
        formModel.checkValidate()
    })
});
events.on(`order:ready`, (data: { field: string, value: string }) => {
    formModel.orderData(data.field, data.value);
});
events.on('form:error', (errors: Partial<IOrderForms>) => {
    const { address, payment } = errors;
    order.valid = !address && !payment;
    order.formErr.textContent = Object.values({address, payment}).filter(i => !!i).join(' и ');
})
// Открываем модальное окно Заказ с тел и почтой
events.on('contacts:open', () => {
    formModel.total = basketModel.getSummaProducts();
    modal.content = contacts.render();
    modal.render();
    formModel.checkValidate()
events.on('contacts:change', (event: { field: string, value: string }) => { 
        formModel[event.field] = event.value
        formModel.checkValidate()
    })
});
events.on(`order:ready`, (data: { field: string, value: string }) => {
    formModel.orderData(data.field, data.value);
});
events.on('form:error', (errors: Partial<IOrderForms>) => {
    const { email, phone } = errors;
    contacts.valid = !email && !phone;
    contacts.formErr.textContent = Object.values({ phone, email }).filter(i => !!i).join(' и ');
})
// Открываем модальное окно Заказ удачно сформирован
events.on('success:open', () => {
    const orderData: IBasketOrder = formModel.orderLot();
    api.postOrder(orderData)
        .then((data) => {
            // console.log(data);
            modal.content = success.render(basketModel.getSummaProducts());
            basketModel.clear();
            basket.renderBasketHeaderCounter(basketModel.getCounterToBasket());
            modal.render();
        })
        .catch(err => {
            console.error(err);
            modal.content = err.render('Произошла ошибка при создании заказа. Пожалуйста, попробуйте еще раз.');
            modal.render();
        });
        
        
});
events.on('success:close', () => modal.close());


api.getProductList()
.then(function (data: IProduct[]) {
    dataModel.items = data;
})
.catch(err => {
    console.error(err);
});