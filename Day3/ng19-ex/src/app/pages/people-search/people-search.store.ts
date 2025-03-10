import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { Person } from "../../model/person.model";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap, tap } from "rxjs";
import { computed, inject } from "@angular/core";
import { ApiService } from "../../services/api.service";

export interface PeopleSearchState {
    readonly query: string;
    readonly results: Person[];
    readonly selectedPerson: Person | null;
    readonly isLoading: boolean;
}

const peopleSearchInitialState: PeopleSearchState = {
    query: '',
    results: [],
    selectedPerson: null,
    isLoading: false
};
export const PeopleSearchStore = signalStore(
    withState(peopleSearchInitialState),
    withMethods((store, api = inject(ApiService)) => ({
        search: rxMethod<string>((query$) => query$.pipe(
            tap((query) => patchState(store, { query })),
        )),
        setSelectedPerson: rxMethod<Person>((person$) => person$.pipe(
            tap((selectedPerson) => patchState(store, { selectedPerson })),
        )),
        init: rxMethod<void>((q$) => q$.pipe(
            tap(() => patchState(store, { isLoading: true })),
            switchMap(() => api.getAllPeople()),
            tap((resultsFrombackend) => patchState(store, { results: resultsFrombackend, isLoading: false }))
        )),
    })),
    withComputed((store) => ({
        searchResults: computed(() => store.results().filter(p => p.name.toLowerCase().includes(store.query().toLowerCase())))
    })),
    withHooks((store) => (
        {
            onInit() {
                store.init();
            },
            onDestroy() { }
        })
    )
);
