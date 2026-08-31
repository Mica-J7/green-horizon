import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ['menu', 'toggle'];

    connect() {
        this.clickOutsideHandler = (event) => {
            if (this.menuTarget.classList.contains('is-open') && !this.element.contains(event.target)) {
                this.close();
            }
        };
        document.addEventListener('click', this.clickOutsideHandler);
    }

    disconnect() {
        document.removeEventListener('click', this.clickOutsideHandler);
    }

    toggle() {
        const isOpen = this.menuTarget.classList.toggle('is-open');
        this.toggleTarget.classList.toggle('is-open', isOpen);
        this.toggleTarget.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    close() {
        this.menuTarget.classList.remove('is-open');
        this.toggleTarget.classList.remove('is-open');
        this.toggleTarget.setAttribute('aria-expanded', 'false');
    }
}
