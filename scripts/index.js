const profileFormElement = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const popup_type_image = document.querySelector('.popup_type_image');


// @todo: Темплейт карточки
const content = document.querySelector('.content');
const cardsContent = content.querySelector('.places__list');


function addCard(name, link) {
	const cardTemplate = document.querySelector('#card-template').content;
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

	cardElement.querySelector('.card__image').src = link;
	cardElement.querySelector('.card__title').textContent = name;

	return cardElement
}


// @todo: DOM узлы
const profileEditing = content.querySelector('.profile__edit-button');
const buttonProfile = profileFormElement.querySelector('.popup__close');


profileEditing.addEventListener('click', () => {
	openModal(profileFormElement);

	nameInput.value = content.querySelector('.profile__title').textContent;
	jobInput.value = content.querySelector('.profile__description').textContent;
})

buttonProfile.addEventListener('click', () => {
	removeModal(profileFormElement);
});


function openModal(popup) {      
	popup.classList.add('popup_is-opened');
}
function removeModal(popup) {      
	popup.classList.remove('popup_is-opened');
}

// функция редактирования профиля
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');
const buttonSubmit = profileFormElement.querySelector('.popup__button');


function handleProfileFormSubmit(evt) {
    evt.preventDefault();

		const title = content.querySelector('.profile__title');
		const description = content.querySelector('.profile__description');

		title.textContent = nameInput.value;
		description.textContent = jobInput.value;
		removeModal(profileFormElement);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

// @todo: Функция создания карточки
const addButton = content.querySelector('.profile__add-button');
const closeButton = cardPopup.querySelector('.popup__close');
const CardSubmit = cardPopup.querySelector('.popup__button');

addButton.addEventListener('click', () => {
	openModal(cardPopup);
});

closeButton.addEventListener('click', () => {
	removeModal(cardPopup);
});

function handleCardsFormSubmit(evt) {
	evt.preventDefault();

	const title = cardPopup.querySelector('.popup__input_type_card-name');
	const link = cardPopup.querySelector('.popup__input_type_url');

	const card = addCard(title.value, link.value);
	cardsContent.prepend(card);
	removeModal(cardPopup);
}

cardPopup.addEventListener('submit', handleCardsFormSubmit);
// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
	const card = addCard(item.name, item.link);
	cardsContent.append(card);
});