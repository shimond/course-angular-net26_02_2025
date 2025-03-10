import { Component, signal } from '@angular/core';
import { CounterComponent } from './components/counter/counter.component';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PeopleDashboardComponent } from './pages/people-dashboard/people-dashboard.component';

@Component({
    selector: 'app-root',
    imports: [CounterComponent, PeopleDashboardComponent],
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
