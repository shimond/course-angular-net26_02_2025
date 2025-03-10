import { Component, computed, getDebugNode, input, Input, output, signal } from '@angular/core';
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
    selectedPeople = input<Person[]>([]);
    personSelected = output<Person>();
    selectedDictinary = computed(() => {
        const dict: { [key: string]: Person } = {};
        this.selectedPeople().forEach(p => 
            dict[p.id.toString()] = p
        );
        console.log(dict);
        return dict;
    });

    onPersonClicked(person: Person) {
        this.personSelected.emit(person);
    }
}
