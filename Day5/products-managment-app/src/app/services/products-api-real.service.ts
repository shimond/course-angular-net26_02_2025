import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductsApiRealService {
    private readonly baseUrl = 'https://localhost:7296/products';

    #http = inject(HttpClient);

    constructor() { }

    getAll(): Observable<Product[]> {
        return this.#http.get<Product[]>(this.baseUrl);
    }

    deleteItem(id: number): Observable<number> {
        return this.#http.delete<number>(`${this.baseUrl}/${id}`);
    }

    insert(product: Omit<Product, 'id'>): Observable<Product> {
        return this.#http.post<Product>(this.baseUrl, product);
    }

    update(product: Product): Observable<Product> {
        return this.#http.put<Product>(`${this.baseUrl}/${product.id}`, product);
    }

    getById(id: number): Observable<Product> {
        return this.#http.get<Product>(`${this.baseUrl}/${id}`);
    }
}