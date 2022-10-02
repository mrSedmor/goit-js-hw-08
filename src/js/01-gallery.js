import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { galleryItems } from './gallery-items';

// В ДЗ використано шаблонізітор pug (для даного налаштування parcel встановити handlebars не вдалось)
// Попередній код, що використовувався до шаблонізатора, закоментовано

// Шаблон для одного зображення:
// import createGalleryImageMarkup from '../templates/gallery-image.pug';

// Шаблон для галереї повністю:
import createGalleryMarkup from '../templates/gallery.pug';

const galleryElem = document.querySelector('.gallery');

// galleryElem.innerHTML = createGalleryMarkup(galleryItems);
galleryElem.innerHTML = createGalleryMarkup({ images: galleryItems });

const lightbox = new SimpleLightbox('.gallery__item', {
  captionsData: 'alt',
  captionDelay: 250,
});

// function createGalleryMarkup(galleryItems) {
//   return galleryItems.map(createGalleryImageMarkup).join('');
// }

// Замість наступної функції використано шаблонізатор pug
// function createGalleryImageMarkup({ preview, original, description }) {
//   return `
//       <a class="gallery__item" href="${original}">
//         <img class="gallery__image" src="${preview}" alt="${description}" />
//       </a>`;
// }
