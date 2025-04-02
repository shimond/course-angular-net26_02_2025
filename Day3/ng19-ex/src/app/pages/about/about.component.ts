import { Component, computed, input, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';

@Component({
    selector: 'app-about',
    imports: [],
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss'
})
export class AboutComponent {

    message = input('');
    x = input<number>(0);
    y = input<number>(0);
    mul = computed(() => this.x() * this.y());
    // constructor(activatedRoute: ActivatedRoute) {
    //     const comb = combineLatest([activatedRoute.params, activatedRoute.queryParams]).subscribe(([params, queryParams]) => {
    //         this.x.set(params['x']);
    //         this.y.set(params['y']);
    //         this.message = queryParams['message'];
    //     });
    // }


}
