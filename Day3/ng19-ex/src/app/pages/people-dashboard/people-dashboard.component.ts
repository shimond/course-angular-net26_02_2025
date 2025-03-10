import { Component, signal } from '@angular/core';
import { Person } from '../../model/person.model';
import { PersonListComponent } from '../../components/person-list/person-list.component';

@Component({
    selector: 'app-people-dashboard',
    imports: [PersonListComponent],
    templateUrl: './people-dashboard.component.html',
    styleUrl: './people-dashboard.component.scss'
})
export class PeopleDashboardComponent {
    employees = signal<Person[]>([
        { id: 1, name: 'John', email: 'john@gmail.com', gender: 'M' },
        { id: 2, name: 'Jane', email: 'jane@gmail.com', gender: 'F' },
        { id: 3, name: 'Alice', email: 'alice@gmail.com', gender: 'F' },
        { id: 4, name: 'Bob', email: 'bob@gmail.com', gender: 'M' },
        { id: 5, name: 'Charlie', email: 'charlie@gmail.com', gender: 'M' },
        { id: 6, name: 'Diana', email: 'diana@gmail.com', gender: 'F' },
        { id: 7, name: 'Eve', email: 'eve@gmail.com', gender: 'F' },
        { id: 8, name: 'Frank', email: 'frank@gmail.com', gender: 'M' },
        { id: 9, name: 'Grace', email: 'grace@gmail.com', gender: 'F' },
        { id: 10, name: 'Hank', email: 'hank@gmail.com', gender: 'M' }
    ]);
}
