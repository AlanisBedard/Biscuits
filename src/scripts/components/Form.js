export default class Form {
  /**
   * Methode contructor
   * @param {HTMLElement} element - Eleement HTML sur lequel la composante est instancie
   */

  constructor(element) {
    this.element = element;
    this.formElements = this.element.elements;
    this.init();
  }
  /**
   * Methode d'instanciation
   */
  init() {
    this.element.setAttribute('novalidate', '');

    for (let i = 0; i < this.formElements.length; i++) {
      const input = this.formElements[i];

      //Permet de changer la classe du conteneur en tout temps
      if (input.required) {
        input.addEventListener('input', this.validateInput.bind(this));
      }
    }
    this.element.addEventListener('submit', this.onSubmit.bind(this));
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.validate()) {
      //Evoyer le formulaire
      this.showConfirmation();
    } else {
      //Erreur
    }
  }

  /**
   * method description
   * @return {boolean} - Status de la validation
   */
  validate() {
    let isValid = true;
    for (let i = 0; i < this.formElements.length; i++) {
      const input = this.formElements[i];

      if (input.required && !this.validateInput(input)) {
        isValid = false;
        console.log(isValid);
      }
    }
    return isValid;
  }

  validateInput(event) {
    const input = event.currentTarget || event; //Constante qui repaire les evenements et les elements html (currentTarget)

    if (input.validity.valid) {
      //Pas erreur
      this.removeError(input);
    } else {
      //afficher une erreur
      this.addError(input);
    }
    return input.validity.valid;
  }

  addError(input) {
    const container =
      input.closest('[data-input-container]') || input.closest('.input'); //Permet d'ajouter une classe sur le parent d'input ou de l'ajouter sur le parent ayant un data-input-container
    container.classList.add('error');
  }

  removeError(input) {
    const container =
      input.closest('[data-input-container]') || input.closest('.input'); //Permet d'ajouter une classe sur le parent d'input ou de l'ajouter sur le parent ayant un data-input-container
    container.classList.remove('error');
  }

  showConfirmation() {
    this.element.classList.add('is-sent');
  }
}
