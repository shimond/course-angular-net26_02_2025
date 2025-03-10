import { Component, getDebugNode, input, Input, output, signal } from '@angular/core';
import { Person } from '../../model/person.model';

@Component({
    selector: 'app-person-list',
    imports: [],
    templateUrl: './person-list.component.html',
    styleUrl: './person-list.component.scss'
})
export class PersonListComponent {
    list = input.required<Person[]>();
    title = input<string>('Worker list');
    selectedPerson = input<Person | null>(null);
    personSelected = output<Person>();
    
    onPersonClicked(person: Person) {
        this.personSelected.emit(person);
    }
}
