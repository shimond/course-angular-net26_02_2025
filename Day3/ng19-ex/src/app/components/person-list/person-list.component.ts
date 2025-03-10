import { Component, getDebugNode, input, Input, output, signal } from '@angular/core';
import { Person } from '../../model/person.model';

@Component({
    selector: 'app-person-list',
    imports: [],
    templateUrl: './person-list.component.html',
    styleUrl: './person-list.component.scss'
})
export class PersonListComponent {
    // @Input() list: Person[] = [];
    list = input.required<Person[]>();
    title = input<string>('Worker list');
    personSelected = output<Person>();
    
    onPersonClicked(person: Person) {
        this.personSelected.emit(person);
    }



    // updateList() {
    //     const copyList = this.list().map(x => ({ ...x }));
    //     const items = [...copyList, { id: 11, name: 'Ivy', email: 'wow@wow.com', gender: 'F' }] as Person[];
    //     this.list.set(items);
    // }
}
