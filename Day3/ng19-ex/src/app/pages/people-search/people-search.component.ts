import { Component, inject, signal } from '@angular/core';
import { PeopleSearchStore } from './people-search.store';
import { debounceTime, map, of } from 'rxjs';
import { PersonListComponent } from '../../components/person-list/person-list.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Person } from '../../model/person.model';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-people-search',
    imports: [PersonListComponent, ReactiveFormsModule, JsonPipe],
    templateUrl: './people-search.component.html',
    styleUrl: './people-search.component.scss',
    providers: [PeopleSearchStore]
})
export class PeopleSearchComponent {

    searchControl = new FormControl<string>('');
    store = inject(PeopleSearchStore);

    constructor() {
        const obs = this.searchControl.valueChanges.pipe(debounceTime(200), map(x => x!))
        this.store.search(obs);
    }

    setDianaAsSelected() {
        const res = this.store.results().find(p => p.name === 'Diana');
        if(res){
            this.store.setSelectedPerson(res);
        }
    }

}