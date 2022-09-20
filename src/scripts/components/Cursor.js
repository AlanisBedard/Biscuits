/* Composante Cursor de Timtools */
export default class Cursor {

  /**
   * Méthode constructeur 
   * @param {HTMLElement} element - Élément HTML sur lequel la composante est instanciée 
   */
  constructor(element) {
    this.element = element;

    document.documentElement.classList.add('custom-cursor');

    this.init();
  }

  // Gère l'état et le style du curseur
  init() {
    this.initCursorActions();
    this.initHoverAnimation();

    if (document.querySelector('[data-component="Cursor"]').dataset.curseur == 'defaut') {
      let cursor = document.querySelector('[data-curseur="defaut"]');
      cursor.classList.add('curseur-defaut');
    }

    if (document.querySelector('[data-component="Cursor"]').dataset.curseur == 'dark') {
      let cursor = document.querySelector('[data-curseur="dark"]');
      cursor.classList.add('curseur-dark');
    }

    if (document.querySelector('[data-component="Cursor"]').dataset.curseur == 'icon') {
      let cursor = document.querySelector('[data-curseur="icon"]');
      cursor.classList.add('curseur-icon');
    }
  }

  // Appelle les méthodes afin de gérer l'état du curseur
  initCursorActions() {
    document.addEventListener('mousemove', this.followCursor.bind(this));
    document.addEventListener('mousedown', this.onMouseDown.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  // Détecte si le curseur survole l'élément désigné
  initHoverAnimation() {
    if (this.element.dataset.curseur == 'icon') {
      this.links = document.querySelectorAll(
        'a[data-cursor-hover], button[data-cursor-hover], article[data-cursor-hover]');
    } else {
      this.links = document.querySelectorAll(
        'a:not([data-no-cursor-hover]), button:not([data-no-cursor-hover])');
    }

    for (let i = 0; i < this.links.length; i++) {
      const link = this.links[i];
      link.addEventListener('mouseenter', this.onLinkHover.bind(this));
      link.addEventListener('mouseleave', this.onLinkOut.bind(this));
    }
  }

  // Récupère la position du curseur
  followCursor(evt) {
    const mouseX = evt.pageX;
    const mouseY = evt.pageY;

    this.element.style.left = `${mouseX}px`;
    this.element.style.top = `${mouseY}px`;
  }

  // Ajoute la classe "hover" à l'élément
  onLinkHover() {
    this.element.classList.add('hover');
  }

  // Retire la classe "hover" à l'élément
  onLinkOut() {
    this.element.classList.remove('hover');
  }

  // Ajoute la classe "down" à l'élément
  onMouseDown() {
    this.element.classList.add('down');
  }

  // Retire la classe "down" à l'élément
  onMouseUp() {
    this.element.classList.remove('down');
  }
}
