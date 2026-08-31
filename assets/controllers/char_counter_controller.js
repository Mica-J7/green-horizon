import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    connect() {
        this.textarea = this.element.querySelector('textarea');
        if (!this.textarea) {
            return;
        }

        this.max = parseInt(this.textarea.getAttribute('maxlength'), 10) || null;

        this.counter = document.createElement('p');
        this.counter.className = 'char-counter';
        this.textarea.insertAdjacentElement('afterend', this.counter);

        this.update = this.update.bind(this);
        this.textarea.addEventListener('input', this.update);
        this.update();
    }

    disconnect() {
        this.textarea?.removeEventListener('input', this.update);
        this.counter?.remove();
    }

    update() {
        const length = this.textarea.value.length;
        this.counter.textContent = this.max ? `${length} / ${this.max}` : `${length}`;
    }
}
