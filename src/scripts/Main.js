import ComponentFactory from './ComponentFactory';
import Icons from './utils/Icons';

class Main {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    // On ajoute une classe sur le html pour qu'on puisse savoir si le JavaScript est supporté dans notre css

    document.documentElement.classList.add('has-js');
    Icons.load();

    new ComponentFactory();
  }
}
new Main();
