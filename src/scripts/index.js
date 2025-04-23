import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../pages/index.css';

import logo from '../images/logo.svg';
import avatar from '../images/avatar.jpg';

import { initialCards } from './cards';


document.querySelector('.logo').src = logo;
document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;


const profileFormElement = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const content = document.querySelector('.content');
const cardsContent = content.querySelector('.places__list');


const imageElement = imagePopup.querySelector('.popup__image');
const caption = imagePopup.querySelector('.popup__caption');
const imageButton = imagePopup.querySelector('.popup__close');


// @todo: Темплейт карточки
function createCard(name, link) {
	const cardTemplate = document.querySelector('#card-template').content;
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

	const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

	likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_is-active');
  });

	deleteButton.addEventListener('click', () => {
    cardElement.remove();
  });

	cardImage.addEventListener('click', () => {
    imageElement.src = link;
    imageElement.alt = name;
    caption.textContent = name;
    openModal(imagePopup);
  });

	return cardElement
}

// функция редактирования профиля
function handleProfileFormSubmit(evt) {
	evt.preventDefault();

	const title = content.querySelector('.profile__title');
	const description = content.querySelector('.profile__description');

	title.textContent = nameInput.value;
	description.textContent = jobInput.value;
	closeModal(profileFormElement);
}

// @todo: Функция создания карточки
function handleCardsFormSubmit(evt) {
	evt.preventDefault();

	const title = cardPopup.querySelector('.popup__input_type_card-name');
	const link = cardPopup.querySelector('.popup__input_type_url');

	const card = createCard(title.value, link.value);
	cardsContent.prepend(card);
	closeModal(cardPopup);
}

function openModal(popup) {      
	popup.classList.add('popup_is-opened');
	popup.classList.add('popup_is-animated');
	document.addEventListener('keydown', closeByEsc);
}

function closeModal(popup) {      
	popup.classList.remove('popup_is-opened');
	popup.classList.remove('popup_is-animated');
	document.removeEventListener('keydown', closeByEsc);
}

function closeByEsc(evt){
	if (evt.key === "Escape") {
		const openedPopup = document.querySelector('.popup_is-opened');
		if (openedPopup) {
			closeModal(openedPopup);
		}
	}
}

// @todo: DOM узлы
const profileEditing = content.querySelector('.profile__edit-button');
const buttonProfile = profileFormElement.querySelector('.popup__close');


const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');
const buttonSubmit = profileFormElement.querySelector('.popup__button');


const addButton = content.querySelector('.profile__add-button');
const closeButton = cardPopup.querySelector('.popup__close');
const cardSubmit = cardPopup.querySelector('.popup__button');

imageButton.addEventListener('click', () => {
  closeModal(imagePopup);
});

profileEditing.addEventListener('click', () => {
	openModal(profileFormElement);

	nameInput.value = content.querySelector('.profile__title').textContent;
	jobInput.value = content.querySelector('.profile__description').textContent;
});

buttonProfile.addEventListener('click', () => {
	closeModal(profileFormElement);
});

profileFormElement.addEventListener('submit', handleProfileFormSubmit);


addButton.addEventListener('click', () => {
	openModal(cardPopup);
});

closeButton.addEventListener('click', () => {
	closeModal(cardPopup);
});

cardPopup.addEventListener('submit', handleCardsFormSubmit);


// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
	const card = createCard(item.name, item.link);
	cardsContent.append(card);
});


// Валидация формы «Редактировать профиль»
const profileForm = document.getElementById('edit-profile');
const inputName = profileForm.querySelector('.popup__input_type_name');
const aboutInput = profileForm.querySelector('.popup__input_type_description');
const saveBtn = profileForm.querySelector('.popup__button');

const validateField = (input, errorElem) => {
  if (!input.validity.valid) {
    errorElem.textContent = input.validationMessage;
  } else {
    errorElem.textContent = '';
  }
};

const updateButtonState = () => {
  saveBtn.disabled = !profileForm.checkValidity();
};

profileForm.addEventListener('input', () => {
  validateField(inputName, document.getElementById('name-error'));
  validateField(aboutInput, document.getElementById('about-error'));
  updateButtonState();
});

profileForm.addEventListener('submit', (e) => {
  if (!profileForm.checkValidity()) {
    e.preventDefault();
  }
});

// Валидация формы «Новое место»
const placeForm = document.getElementById('new-place');
const inputText = placeForm.querySelector('.popup__input_type_card-name');
const inputUrl = placeForm.querySelector('.popup__input_type_url')
const savePlaceBtn = placeForm.querySelector('.popup__button');

const updateButton = () => {
  savePlaceBtn.disabled = !placeForm.checkValidity();
};

updateButton(); 
placeForm.addEventListener('input', () => {
  validateField(inputText, document.getElementById('text-error'));
  validateField(inputUrl, document.getElementById('url-error'));
  updateButton();
});

placeForm.addEventListener('submit', (e) => {
  if (!placeForm.checkValidity()) {
    e.preventDefault();
  }
});

// Закрытие поп-апа кликом на оверлей
document.addEventListener('click', (event) => {
	closeModal(event.target);
})
