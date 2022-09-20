import Cache from '../utils/Cache';

export default class Snackbar {
  constructor(element) {
    this.element = element;
    this.scrollLimit = 0;

    this.scrollPosition = 0;
    this.lastScrollPosition = 0;
    this.html = document.documentElement;
    this.init();
  }

  init() {
    /* Permet d'écouter si l'utilisateur défile dans la page */
    window.addEventListener('scroll', this.OnScroll.bind(this));

    /* Permet de mettre une valeur dans la variable des délais d'apparition de la Snackbar */
    if (!this.element.getAttribute('data-delay')) {
      this.snackbarDelay = 4000;
    } else {
      this.snackbarDelay = this.element.getAttribute('data-delay') * 1000;
    }
    console.log(this.snackbarDelay);

    /* Permet d'appeler une méthode pour faire apparaitre la Snackbar après un délai déterminés */
    setTimeout(this.snackbarEntre.bind(this), this.snackbarDelay);

    /* Appel la méthode qui permet de vérifier la cache de l'utilisateur */
    this.checkCache();
  }

  /**
   * Méthode qui permet de savoir vers quelle direction l'utilisateur se dirige lorsque celui-ci scroll dans la page
   */
  OnScroll(event) {
    this.lastScrollPosition = this.scrollPosition;
    this.scrollPosition = document.scrollingElement.scrollTop;

    this.setSnackbarState();
  }

  /**
   * Méthode qui permet de cacher la Snackbar lors du défilement de la page
   */
  setSnackbarState() {
    const ScrollHeight = document.scrollingElement.scrollHeight;

    /* Permet de mettre une valeur dans la variable de la hauteur pour cacher le Snackbar */
    if (!this.element.getAttribute('data-auto-hide')) {
      this.snackbarHide = 0.2;
    } else {
      this.snackbarHide = this.element.getAttribute('data-auto-hide');
    }

    /* Condition qui permet de détecter si un data-component forcera la Snackbar à se cacher */
    if (this.element) {
      if (this.scrollPosition < ScrollHeight * this.snackbarHide) {
        this.element.classList.add('snackbar-is-visible');
      } else {
        this.element.classList.remove('snackbar-is-visible');
      }
    }
  }

  /**
   * Permet de faire apparaitre la Snackbar avec les bonnes classes et un bouton de fermeture fonctionnel
   */
  snackbarEntre() {
    this.element.classList.add('snackbar-is-visible');

    this.closeButton = this.element.querySelector('.js-close');
    this.closeButton.addEventListener('click', this.close.bind(this));
  }

  /**
   * Permet de fermer la Snackbar
   */
  close() {
    const snackbarElement = document.querySelector('.snackbar');
    snackbarElement.classList.remove('snackbar-is-visible');
    this.closeButton.removeEventListener('click', this.close.bind(this));

    /* Permet d'ajouter dans la cache une clef et une valeur pendant que la Snackbar se ferme */
    Cache.set('Snackbar', 'close');

    setTimeout(snackbarElement.destroy, 1000);
  }

  /**
   * Permet de vérifier la cache de l'utilisateur
   */
  checkCache() {
    /* Permet de mettre une valeur par défaut pour la cache */
    const defaultValue = Cache.get('Snackbar');
    /* Permet de ne plus afficher la Snackbar */
    if (defaultValue) {
      document.querySelector('.snackbar').style.display = 'none';
    }
  }
}
