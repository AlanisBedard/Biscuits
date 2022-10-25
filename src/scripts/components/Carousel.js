import Swiper from 'swiper/swiper-bundle';

/* Composante Carousel de Timtools */
export default class Carousel {
  /**
   * Méthode constructeur
   * @param {HTMLElement} element - Élément HTML sur lequel la composante est instanciée
   */
  constructor(element) {
    this.element = element;
    /* Variantes pour la librairie Swiper */
    this.varianteSplit;
    this.variantePagination;
    this.varianteNavigation;
    /* Options par défaut pour la librairie Swiper */
    this.defaultOptions = {
      spaceBetween: 80,
      slidesPerView: 1,
      loop: true,
      watchSlidesProgress: true,
    };

    this.init();
  }

  /* Méthode d'initialisation */
  init() {
    let config = this.defaultOptions;

    /* Variante split */
    /* Gestion de différents paramètres lorsqu'on veut avoir 2 slides visibles sur un grand écran et une seule sur un petit écran*/
    if (this.element.dataset.split) {
      this.varianteSplit = {
        slidesPerView: 1,
        spaceBetween: 20,
        freeMode: true,
        breakpoints: {
          1024: {
            slidesPerView: 3,
          },
          700: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
        },
      };
    }

    /* Variante pagination */
    /* Permet d'instancier une pagination en dessous du carrousel. */
    if (this.element.dataset.pagination) {
      this.variantePagination = {
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
        },
      };
    }

    /* Variante navigation */
    /* Permet d'instancier une navigation sur le côté du carrousel. */
    if (this.element.dataset.navigation) {
      //this.swipers = document.getElementsByClassName('swiper-container');
      this.varianteNavigation = {
        navigation: {
          nextEl: this.element.parentNode.querySelector('.swiper-button-next'),
          prevEl: this.element.parentNode.querySelector('.swiper-button-prev'),
        },
      };
    }

    // Regroupe la version par défaut du carousel ainsi que les variantes
    const option = {
      ...config,
      ...this.varianteSplit,
      ...this.variantePagination,
      ...this.varianteNavigation,
      ...this.varianteNavigation,
    };

    // Instanciation d'un nouveau Swiper avec les options
    new Swiper(this.element, option);
  }
}
