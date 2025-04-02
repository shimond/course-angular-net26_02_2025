import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../model/product.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { InputNumberComponent } from '../input-number/input-number.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-add-edit-product',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        InputNumberComponent,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    templateUrl: './add-edit-product.component.html',
    styleUrl: './add-edit-product.component.scss'
})
export class AddEditProductComponent {
    dialogRef = inject(MatDialogRef<AddEditProductComponent>);
    product = inject(MAT_DIALOG_DATA) as Product | undefined;

    form = inject(FormBuilder).group({
        id: new FormControl<number>(0),
        name: new FormControl<string>('', [Validators.required]),
        price: new FormControl<number>(0),
        notes: new FormControl<string>(''),
        
    });

    constructor() {
        if (this.product) {
            this.form.patchValue(this.product);
        }
    }

    save() {
        if (this.form.valid) {
            this.dialogRef.close(this.form.value);
        }
    }

    cancel() {
        this.dialogRef.close();
    }
}
