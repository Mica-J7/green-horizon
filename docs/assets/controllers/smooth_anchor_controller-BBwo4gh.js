import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    scroll(event) {
        const url = new URL(this.element.href);

        if (url.pathname !== window.location.pathname) {
            return;
        }

        const target = document.getElementById(url.hash.slice(1));
        if (!target) {
            return;
        }

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        event.preventDefault();
        target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        history.pushState(null, '', url.hash);
    }
}
