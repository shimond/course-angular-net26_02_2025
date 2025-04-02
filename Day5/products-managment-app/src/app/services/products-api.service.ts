import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Product } from '../model/product.model';
import { ProductsApiRealService } from './products-api-real.service';

@Injectable({
    providedIn: 'root',
    useClass: ProductsApiRealService
})
export class ProductsApiService {

    private mockProducts: Product[] = [
        {
            id: 1,
            name: 'Laptop',
            price: 999.99,
            notes: 'High performance laptop',
        },
        {
            id: 2,
            name: 'Smartphone',
            price: 699.99,
            notes: 'Latest model'
        },
        {
            id: 3,
            name: 'Tablet',
            price: 399.99,
            notes: 'Large screen'
        },
        {
            id: 4,
            name: 'Headphones',
            price: 149.99,
            notes: 'Noise-canceling'
        },
        {
            id: 5,
            name: 'Camera',
            price: 499.99,
            notes: 'Full HD'
        },
        {
            id: 6,
            name: 'Smartwatch',
            price: 249.99,
            notes: 'Fitness tracking'
        }

    ];

    constructor() { }

    getAll(): Observable<Product[]> {
        return of([...this.mockProducts]).pipe(delay(800));
    }
    deleteItem(id: number): Observable<number> {
        const index = this.mockProducts.findIndex(p => p.id === id);
        if (index !== -1) {
            this.mockProducts.splice(index, 1);
            return of(id).pipe(delay(800));
        }
        throw new Error('Product not found');
    }

    insert(product: Omit<Product, 'id'>): Observable<Product> {
        const newProduct: Product = {
            ...product,
            id: this.getNextId()
        };

        this.mockProducts.push(newProduct);
        return of(newProduct).pipe(delay(800));
    }

    update(product: Product): Observable<Product> {
        const index = this.mockProducts.findIndex(p => p.id === product.id);
        if (index !== -1) {
            this.mockProducts[index] = { ...product };
            return of(this.mockProducts[index]).pipe(delay(800));
        }
        throw new Error('Product not found');
    }

    private getNextId(): number {
        return Math.max(...this.mockProducts.map(p => p.id), 0) + 1;
    }
}
