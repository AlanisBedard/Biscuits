/* Composante Header de Timtools */
export default class Header {
  /* Méthode constructeur */
  constructor(element) {
    this.element = element;
    this.scrollLimit = 0;

    /* Condition permettant de changer la limite au niveau de la présence du Header lors du défilement de la page */
    if (this.element.dataset.header == 'scrollLimit') {
      this.scrollLimit = 0.3;
    }

    this.scrollPosition = 0;
    this.lastScrollPosition = 0;
    this.html = document.documentElement;

    this.init();
    this.initNavMobile();
  }

  /* Méthode d'initialisation */
  init() {
    window.addEventListener('scroll', this.OnScroll.bind(this));
  }

  /* Méthode qui permet de savoir vers quelle direction l'utilisateur se dirige lorsque celui-ci scroll */
  OnScroll(event) {
    this.lastScrollPosition = this.scrollPosition;
    this.scrollPosition = document.scrollingElement.scrollTop;

    this.setHeaderState();
    this.setDirectionState();
  }

  /* Méthode qui permet de cacher le header lors du défilement de la page */
  setHeaderState() {
    const ScrollHeight = document.scrollingElement.scrollHeight;

    /* Condition qui permet de détecter si un data-component forcera le header à se cacher */
    if (
      this.element.dataset.header == 'autoHide' ||
      this.element.dataset.header == 'scrollLimit'
    ) {
      if (this.scrollPosition > ScrollHeight * this.scrollLimit) {
        this.html.classList.add('header-is-hidden');
      } else {
        this.html.classList.remove('header-is-hidden');
      }
    }
  }
  /* Méthode qui permet de définir la direction vers laquelle l'utilisateur se dirige */
  setDirectionState() {
    if (this.scrollPosition >= this.lastScrollPosition) {
      this.html.classList.add('is-scrolling-down');
      this.html.classList.remove('is-scrolling-up');
    } else {
      this.html.classList.remove('is-scrolling-down');
      this.html.classList.add('is-scrolling-up');
    }
  }
  /* Méthode qui permet la gestion de la navigation dans le format mobile */
  initNavMobile() {
    const toggle = this.element.querySelector('.js-toggle');
    toggle.addEventListener('click', this.onToggleNav.bind(this));
  }
  /* Méthode qui permet le toggle du bouton à l'aide de la classe 'nav-is-active' */
  onToggleNav() {
    this.html.classList.toggle('nav-is-active');
  }
}
