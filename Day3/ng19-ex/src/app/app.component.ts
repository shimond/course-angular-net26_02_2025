import { Component, signal } from '@angular/core';
import { CounterComponent } from './components/counter/counter.component';

@Component({
    selector: 'app-root',
    imports: [CounterComponent],
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    isAllVisible = signal(false as boolean);
    showHide() {
        this.isAllVisible.update(x => !x);
    }

}
