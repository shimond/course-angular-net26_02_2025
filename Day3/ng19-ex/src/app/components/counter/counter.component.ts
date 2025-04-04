import { Component, computed, effect, inject, signal } from '@angular/core';
import { CounterService } from '../../services/counter.service';
import { Subscription, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CounterWithSignalsService } from '../../services/counter-with-signals.service';

@Component({
    selector: 'app-counter',
    imports: [AsyncPipe],
    templateUrl: './counter.component.html',
    styleUrl: './counter.component.scss'
})
export class CounterComponent {

    counterService = inject(CounterWithSignalsService);
    isEven = computed(()=> this.counterService.value() % 2 ==  0)
    // // isEven = this.value$.pipe(map(o=> o % 2 == 0));
    // //value = 0;
    // //subs = new Subscription();

    // constructor() {
    //     // const m = this.#counterService.value$.subscribe(o => {
    //     //     console.log('VALUE = ', o);
    //     // });
    //     // this.subs.add(m);
    // }

    // plus() {
    //     this.counterService.plus();
    //     // this.#counterService.value$.next(9125);
    // }

    // minus() {
    //     this.counterService.minus();
    // }

    // ngOnDestroy()
    // {
    //     // this.subs.unsubscribe();
    // }
}
