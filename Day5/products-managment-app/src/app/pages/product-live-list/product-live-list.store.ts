import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { computed, inject } from "@angular/core";
import { switchMap, tap } from "rxjs";
import { Product } from '../../model/product.model';
import { ProductsApiService } from '../../services/products-api.service';
import { SocketService } from '../../services/socket.service';

export interface ProductLiveListState {
    allProducts: Product[];
    favoritesIds: number[];
    isLoading: boolean;
    favoritesOnly: boolean;
    searchKeyWord: string;
}

const initialState: ProductLiveListState = {
    allProducts: [],
    isLoading: false,
    favoritesOnly: false,
    searchKeyWord: '',
    favoritesIds: []
}

export const ProductLiveListStore = signalStore(
    withState(initialState),
    withMethods((store, api = inject(ProductsApiService)) => {

        const updateProduct = rxMethod<Product>(p$ => p$.pipe(
            tap(product => patchState(store, { allProducts: store.allProducts().map(p => p.id === product.id ? product : p), isLoading: false }))
        ));

        const addProduct = rxMethod<Product>(p$ => p$.pipe(
            tap(product => patchState(store, { allProducts: [...store.allProducts(), product] }))));

        const deleteProdct = rxMethod<number>(id$ => id$.pipe(
            tap(id => patchState(store, { allProducts: [...store.allProducts().filter(o=> o.id !== id)] }))));

        const initList = rxMethod<void>(p$ => p$.pipe(
            tap(() => {
                const jsonResultFromLocalstorage = localStorage.getItem('favorites');
                if (jsonResultFromLocalstorage) {
                    patchState(store, { favoritesIds: jsonResultFromLocalstorage ? JSON.parse(jsonResultFromLocalstorage) : [] });
                }
            }),
            tap(() => patchState(store, { isLoading: true })),
            switchMap(() => api.getAll()),
            tap(products => patchState(store, { allProducts: products, isLoading: false }))
        ));

        const setSearchWord = (word: string) => {
            patchState(store, { searchKeyWord: word });
        }

        const toggleFavoritesOnly = () => {
            patchState(store, { favoritesOnly: !store.favoritesOnly() });
        }

        const toggleItemFavorites = (product: Product) => {
            if (store.favoritesIds().includes(product.id)) {
                patchState(store, { favoritesIds: store.favoritesIds().filter(id => id !== product.id) });
            } else {
                patchState(store, { favoritesIds: [...store.favoritesIds(), product.id] });
            }
            localStorage.setItem('favorites', JSON.stringify(store.favoritesIds()));
        }

        return {
            initList,
            deleteProdct,
            updateProduct,
            addProduct,
            toggleItemFavorites,
            toggleFavoritesOnly,
            setSearchWord
        };
    }),
    withComputed((store) => {
        const filteredProductsByFavorites = computed(() => store.allProducts().filter(p => store.favoritesOnly() ? store.favoritesIds().includes(p.id) : true));
        const productResults = computed(() => filteredProductsByFavorites().filter(p => p.name.toLowerCase().includes(store.searchKeyWord().toLowerCase())));
        const productsWithFav = computed(() => productResults().map(p => ({ ...p, isFavorite: store.favoritesIds().includes(p.id) })));

        return {
            filteredProductsByFavorites,
            productResults,
            productsWithFav
        }
    }),
    withHooks({
        onInit: (store, socket = inject(SocketService)) => {
            store.initList();
            store.addProduct(socket.productAdded$);
            store.updateProduct(socket.productChanged$);
            store.deleteProdct(socket.productDeleted$);

        }
    })
);