import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { CDN_URL, API_URL } from './utils/constants';
import { ModelApi } from './components/Model/ModelApi';
import { IFormModel, IProduct } from './types';
import { ProductModel } from './components/Model/ProductModel';
import { Card } from './components/View/Card';
import { Modal } from './components/View/Modal';
import { PreviewCard } from './components/View/PreviewCard';
import { BasketModel } from './components/Model/BasketModel';
import { Basket } from './components/View/Basket';
import { BasketItem } from './components/View/BasketItem';


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
const modal = new Modal(document.querySelector('#modal-container') as HTMLTemplateElement, events);
const basketModel = new BasketModel();
const basket = new Basket(basketTemplate, events);


// Выводим карточки на страницу
events.on('items:receive', () => {
    const galleryElement = document.querySelector<HTMLElement>('.gallery');
    dataModel.items.forEach(item => {
        const card = new Card(cardCatalogTemplate, events, {
            onClick: () => events.emit('card:select', item)
        });
        galleryElement.append(card.render(item));
    });
});

// Получить id карточки по которой кликнули
events.on('card:select', (item: IProduct) => { dataModel.openCard(item) });

// Открываем модальное окно карточки товара
events.on('modal:open', (data: IProduct) => {
    const cardPreview = new PreviewCard(cardPreviewTemplate, events);
    modal.content = cardPreview.render(data);
    modal.render();
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
    basket.itemsList = itemsList;
    modal.content = basket.render();
    modal.render();
});
// Добавить карточку в корзину
events.on('card:inBasket', () => {
    basketModel.setSelectedСard(dataModel.selectedCard);
    basket.renderBasketHeaderCounter(basketModel.getCounterToBasket()); 
    modal.close();
});

// Удалить карточку из корзины
events.on('card:delete', (item: IProduct) => {
    basketModel.deleteSelectedСard(item);
    // Обновляем счетчик
    basket.renderBasketHeaderCounter(basketModel.getCounterToBasket());
    // Обновляем сумму
    basket.renderSumProducts(basketModel.getSummaProducts());
    // Очищаем старые элементы корзины
    basket.itemsList.forEach(item => {
        item.remove();
    });
    // Создаем новый список элементов для рендеринга
    basket.itemsList = basketModel.listBasket.map((currentItem, index) => {
        const basketItem = new BasketItem(cardBasketTemplate, events, {
            onClick: () => events.emit('card:delete', currentItem)
        });
        return basketItem.render(currentItem, index);
    });
    // Добавляем новые элементы в модальное окно
    modal.content = basket.render(); 
    modal.render();
});




api.getProductList()
.then(function (data: IProduct[]) {
    dataModel.items = data;
})
.catch(error => console.log(error))