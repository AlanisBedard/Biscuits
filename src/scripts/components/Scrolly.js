/* Composante Scrolly de Timtools */
export default class Scrolly {
    /* Méthode constructeur */
    constructor(element) {
        this.element = element;
        this.options = {
            /* Détermine la zone d'affichage (dans ce cas, celle-ci est identique au viewport du navigateur) */
            rootMargin: '0px 0px 0px 0px'
        };
        this.init();
    }

    /* Méthode d'initialisation */
    init() {
        this.observer = new IntersectionObserver(
            this.watch.bind(this),
            this.options);
        /* Boucle permettant de naviguer à travers tous les data-scrolly se situant dans le html */
        const items = this.element.querySelectorAll('[data-scrolly]');
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            this.observer.observe(item);

        }
    }

    /* Méthode permettant que notre zone d'affichage intercepte le contenu de notre site et enclenche les animations de celui-ci */
    watch(entries) {

        /* Boucle permettant d'observer le contenu du site se situant dans le html */
        for (let i = 0; i < entries.length; i++) {
            const entry = entries[i];
            const target = entry.target;

            /* Variable qui permet de sélectionner le dataset simpleScroll */
            const simpleScroll = this.element.dataset.scrolly == 'simpleScroll'

            /* Condition qui permet d'enclencher plusieurs fois ou bien une seule fois les animations du site selon la présence de simpleScroll */
            if (entry.isIntersecting) {
                target.classList.add('is-active');

                /* Condition qui permet de n'effectuer qu'une seule fois les animations lorsque simpleScroll est présent dans le html */
                if (entry.isIntersecting == simpleScroll) {
                    target.classList.add('is-active');
                    this.observer.unobserve(target);
                }
            }
            else {
                target.classList.remove('is-active');
            }


        }
    }

}