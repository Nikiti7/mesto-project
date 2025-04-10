// @todo: Темплейт карточки
const content = document.querySelector('.content');
const cardsContent = content.querySelector('.places__list');


function addCard(name, link) {
	const cardTemplate = document.querySelector('#card-template').content;
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

	cardElement.querySelector('.card__image').src = link;
	cardElement.querySelector('.card__title').textContent = name;

	cardsContent.append(cardElement);
}

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
	addCard(item.name, item.link);
});