import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ['viewport', 'prevButton', 'nextButton'];

    connect() {
        this.updateButtons = this.updateButtons.bind(this);
        this.updateButtons();
        this.viewportTarget.addEventListener('scroll', this.updateButtons);
        window.addEventListener('resize', this.updateButtons);
    }

    disconnect() {
        this.viewportTarget.removeEventListener('scroll', this.updateButtons);
        window.removeEventListener('resize', this.updateButtons);
    }

    prev() {
        this.scrollByPage(-1);
    }

    next() {
        this.scrollByPage(1);
    }

    scrollByPage(direction) {
        const viewport = this.viewportTarget;
        viewport.scrollBy({ left: viewport.clientWidth * direction, behavior: 'smooth' });
    }

    updateButtons() {
        const viewport = this.viewportTarget;
        const maxScroll = viewport.scrollWidth - viewport.clientWidth;

        this.prevButtonTarget.disabled = viewport.scrollLeft <= 1;
        this.nextButtonTarget.disabled = viewport.scrollLeft >= maxScroll - 1;
    }
}
