import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CounterService {

    value = 0;
    #valueChanged = new BehaviorSubject<number>(0);
    value$ = this.#valueChanged.asObservable();
    constructor() { }

    plus() {
        this.value++;
        this.#valueChanged.next(this.value);
    }

    minus() {
        this.value--;
        this.#valueChanged.next(this.value);

    }
}
