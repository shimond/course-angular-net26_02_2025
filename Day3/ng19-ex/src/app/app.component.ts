import { Component, signal } from '@angular/core';
import { CounterComponent } from './components/counter/counter.component';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PeopleDashboardComponent } from './pages/people-dashboard/people-dashboard.component';
import { SearchComponent } from './components/search/search.component';
import { PeopleSearchStore } from './pages/people-search/people-search.store';
import { PeopleSearchComponent } from './pages/people-search/people-search.component';

@Component({
    selector: 'app-root',
    imports: [CounterComponent, PeopleDashboardComponent, SearchComponent, PeopleSearchComponent],
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    //Control flow - for, if, switch, etc.
    //Signal
    // computed, effect
    // set, update, () 
    // input, output, required, viewchild
    // asReadOnly()



    isAllVisible = signal(false as boolean);



    showHide() {
        this.isAllVisible.update(x => !x);
    }

}
