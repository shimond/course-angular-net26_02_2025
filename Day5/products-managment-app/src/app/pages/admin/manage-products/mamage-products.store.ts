import { Product } from "../../../model/product.model";
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { ProductsApiService } from "../../../services/products-api.service";
import { inject } from "@angular/core";
import { switchMap, tap } from "rxjs";
import { SocketService } from "../../../services/socket.service";

export interface ManageProductState {
    products: Product[];
    isLoading: boolean;
}

const initialState: ManageProductState = {
    products: [],
    isLoading: false
}

export const ManageProductStore = signalStore(
    withState(initialState),
    withMethods((store, api = inject(ProductsApiService)) => {
        const initList = rxMethod<void>(p$ => p$.pipe(
            tap(() => patchState(store, { isLoading: true })),
            switchMap(() => api.getAll()),
            tap(products => patchState(store, { products, isLoading: false }))
        ));

        const updateItem = rxMethod<Product>(p$ => p$.pipe(
            tap(() => patchState(store, { isLoading: true })),
            switchMap(product => api.update(product)),
            tap(product => patchState(store, { products: store.products().map(p => p.id === product.id ? product : p), isLoading: false }))
        ));

        const addItem = rxMethod<Product>(p$ => p$.pipe(
            tap(() => patchState(store, { isLoading: true })),
            switchMap(product => api.insert(product)),
            tap(product => patchState(store, { products: [...store.products(), product] , isLoading: false }))
        ));

        const deleteItem = rxMethod<Product>(p$ => p$.pipe(
            tap(() => patchState(store, { isLoading: true })),
            switchMap(product => api.deleteItem(product.id)),
            tap(id => patchState(store, { products: store.products().filter(p => p.id !== id), isLoading: false }))
        ));

        return {
            initList,
            updateItem,
            addItem,
            deleteItem
        };
    }),
    withHooks({
        onInit: (store) => {
            store.initList();
        }
    })
);