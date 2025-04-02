import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProductLiveListStore } from './product-live-list.store';
import { Product } from '../../model/product.model';

@Component({
    selector: 'app-product-live-list',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        ReactiveFormsModule
    ],
    providers: [ProductLiveListStore],
    templateUrl: './product-live-list.component.html',
    styleUrl: './product-live-list.component.scss'
})
export class ProductLiveListComponent {
    store = inject(ProductLiveListStore);
    searchControl = new FormControl('');

    displayedColumns: string[] = [
        'favorite',
        'name',
        'price',
        'notes'
    ];

    constructor() {
        this.searchControl.valueChanges.subscribe(value => {
            this.store.setSearchWord(value || '');
        });
    }
  

    toggleFavorite(product: Product, event: Event) {
        event.stopPropagation();
        this.store.toggleItemFavorites(product);
    }
}
