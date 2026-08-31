import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    async submit(event) {
        const form = event.target;
        event.preventDefault();

        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
        });

        this.element.innerHTML = await response.text();
    }
}
