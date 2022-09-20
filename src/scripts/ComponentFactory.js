import Carousel from './components/Carousel';
import Scrolly from './components/Scrolly';
import Cursor from './components/Cursor';
import Header from './components/Header';
import Modal from './components/Modal';
import Form from './components/Form';
import Snackbar from './components/Snackbar';

export default class ComponentFactory {
  constructor() {
    this.componentList = {
      Carousel,
      Scrolly,
      Cursor,
      Header,
      Modal,
      Form,
      Snackbar,
    };

    this.init();
  }

  init() {
    const components = document.querySelectorAll('[data-component]');

    for (let i = 0; i < components.length; i++) {
      const element = components[i];
      const componentName = element.dataset.component;

      if (componentName == 'Carousel') {
        new Carousel(element);
      } else if (componentName == 'Scrolly') {
        new Scrolly(element);
      } else if (componentName == 'Cursor') {
        new Cursor(element);
      } else if (componentName == 'Header') {
        new Header(element);
      } else if (componentName == 'Modal') {
        new Modal(element);
      } else if (componentName == 'Form') {
        new Form(element);
      } else if (componentName == 'Snackbar') {
        new Snackbar(element);
      } else {
        console.log(`La composante ${componentName} n'existe pas`);
      }
    }
  }
}
