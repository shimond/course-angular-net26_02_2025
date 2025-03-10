import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CounterService {

    #valueChanged = signal(0);
    value = this.#valueChanged.asReadonly();

    constructor() { }

    plus() {
        this.#valueChanged.update(x=> x + 1);
    }

    minus() {
        this.#valueChanged.update(x=> x - 1);

    }
}
