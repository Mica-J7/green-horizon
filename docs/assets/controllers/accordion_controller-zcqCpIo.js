import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ['content'];

    animation = null;

    toggle(event) {
        event.preventDefault();

        if (this.element.hasAttribute('open')) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        const content = this.contentTarget;
        const startHeight = content.getBoundingClientRect().height;
        this.animation?.cancel();

        this.element.setAttribute('open', '');
        this.element.classList.add('is-open');
        const endHeight = content.scrollHeight;

        this.animation = content.animate(
            { height: [`${startHeight}px`, `${endHeight}px`], opacity: [0, 1] },
            { duration: 260, easing: 'ease-out', fill: 'forwards' },
        );
    }

    close() {
        const content = this.contentTarget;
        const startHeight = content.getBoundingClientRect().height;
        this.animation?.cancel();
        this.element.classList.remove('is-open');

        this.animation = content.animate(
            { height: [`${startHeight}px`, '0px'], opacity: [1, 0] },
            { duration: 260, easing: 'ease-in', fill: 'forwards' },
        );
        this.animation.onfinish = () => {
            this.element.removeAttribute('open');
        };
    }
}
