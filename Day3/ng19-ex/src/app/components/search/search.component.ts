import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { debounceTime, map, switchMap } from 'rxjs';

@Component({
    selector: 'app-search',
    imports: [ReactiveFormsModule],
    templateUrl: './search.component.html',
    styleUrl: './search.component.scss'
})
export class SearchComponent {
    searchControl = new FormControl<string>('');
    #apiService = inject(ApiService);
    results = signal<any[]>([]);

    constructor() {
        this.searchControl.valueChanges.pipe(
            debounceTime(200),
            switchMap(query => this.#apiService.getAllTodos(query!))).subscribe(data => {
            this.results.set(data);
        });;



        // this.searchControl.valueChanges.subscribe(query =>{
        //     this.#apiService.getAllTodos(query!).subscribe(data => {
        //         this.results.set(data);
        //     });

        // });
    }

}
