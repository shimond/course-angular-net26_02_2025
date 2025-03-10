import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Person } from '../model/person.model';
import {delay } from 'rxjs/operators';
import {  Observable, of } from 'rxjs';

@Injectable({
        providedIn: 'root'
    }
)
export class ApiService {

    #http = inject(HttpClient);

    getAllPeople() : Observable<Person[]> {
        return of([
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
        ] as Person[]).pipe(delay(2500));

    }

    getAllTodos(query: string){
        return this.#http.get<any[]>('http://jsonplaceholder.typicode.com/todos?q=' + query);
    }

    constructor() { }
}
