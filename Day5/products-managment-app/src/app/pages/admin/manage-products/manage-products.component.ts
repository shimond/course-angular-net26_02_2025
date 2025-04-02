import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditProductComponent } from '../../../components/add-edit-product/add-edit-product.component';
import { Product } from '../../../model/product.model';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { ManageProductStore } from './mamage-products.store';

@Component({
    selector: 'app-manage-products',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule
    ],
    providers: [ManageProductStore],    
    templateUrl: './manage-products.component.html',
    styleUrl: './manage-products.component.scss'
})
export class ManageProductsComponent implements OnInit {
    private dialog = inject(MatDialog);
    store = inject(ManageProductStore);

    displayedColumns: string[] = [
        'id',
        'name',
        'price',
        'notes',
        'actions'
    ];

    ngOnInit() {
        this.store.initList();
    }

    addProduct() {
        const dialogRef = this.dialog.open(AddEditProductComponent, {
            width: '500px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.store.addItem(result);
            }
        });
    }

    editProduct(product: Product) {
        const dialogRef = this.dialog.open(AddEditProductComponent, {
            width: '500px',
            data: product
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.store.updateItem(result);
            }
        });
    }

    deleteProduct(product: Product) {
        if (confirm(`Are you sure you want to delete ${product.name}?`)) {
            this.store.deleteItem(product);
        }
    }

   
}
