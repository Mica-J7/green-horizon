import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ['dialog', 'image'];

    savedScrollY = 0;

    connect() {
        this.dialogTarget.addEventListener('close', () => {
            window.scrollTo({ top: this.savedScrollY, behavior: 'instant' });
        });
    }

    open(event) {
        this.savedScrollY = window.scrollY;

        const { src, caption } = event.params;
        this.imageTarget.src = src;
        this.imageTarget.alt = caption ?? '';
        this.dialogTarget.showModal();
    }

    close() {
        this.dialogTarget.close();
    }

    closeOnBackdrop(event) {
        if (event.target === this.dialogTarget) {
            this.close();
        }
    }
}
