import Utils from "../utils/Utils";

/* Composante Modal de Timtools */
export default class Modal {

    /**
     * Méthode constructeur 
     * @param {HTMLElement} element - Élément HTML sur lequel la composante est instanciée 
     */
    constructor(element) {
        this.element = element;
        this.modalId = this.element.dataset.modalId;
        this.init();
    }

    // Permet la gestion globale de la fenêtre modale
    init() {
        this.element.addEventListener('click', this.open.bind(this));
        this.close = this.close.bind(this);

        // Affiche la fenêtre modale 5000ms après l'arrivée de l'utilisateur
        if (this.element.dataset.modal == 'callAfter') {
            setTimeout(this.appendModal.bind(this), 5000);
        }

        // Ferme la fenêtre modale lorsque la touche "Escape" est appuyée
        document.addEventListener('keydown', (event) => {
            if (event.key === "Escape") {
                this.close();
            }
        });
    }

    // Méthode permettant d'appeler l'ouverture de la fenêtre modale
    open(event) {
        event.preventDefault();
        this.appendModal();
    }

    // Méthode permettant de fermer la fenêtre modale
    close() {
        document.documentElement.classList.remove('modal-is-active');
        this.closeButton.removeEventListener('click', this.close);

        setTimeout(this.destroy.bind(this), 1000);
    }

    // Méthode permettant de retirer l'élément fenêtre modale de son parent
    destroy() {
        this.modalElement.parentElement.removeChild(this.modalElement);
    }

    // Méthode permettant d'ouvrir la fenêtre modale
    appendModal() {
        const template = document.querySelector(`#${this.modalId}`);

        if (template) {
            this.modalElement = template.content.firstElementChild.cloneNode(true);

            document.body.appendChild(this.modalElement);

            this.element.getBoundingClientRect();
            document.documentElement.classList.add('modal-is-active');

            this.closeButton = this.modalElement.querySelector('.js-close');
            this.closeButton.addEventListener('click', this.close);
        }
        else {
            console.log(`Le <template> avec le id ${this.modalId} n'existe pas`);
        }
    }
}