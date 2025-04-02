import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Address, Product, UserReview } from '../../model/product.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { JsonPipe } from '@angular/common';
import { InputNumberComponent } from '../input-number/input-number.component';
import { InputAddressComponent } from '../input-address/input-address.component';
import { GenericFormArrayComponent } from '../generic-form-array/generic-form-array.component';
import { InputUserReviewComponent } from '../input-user-review/input-user-review.component';

@Component({
    selector: 'app-add-edit-product',
    imports: [ReactiveFormsModule,
        GenericFormArrayComponent,
        InputUserReviewComponent,
        JsonPipe,
        InputAddressComponent,
        InputNumberComponent,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule],
    templateUrl: './add-edit-product.component.html',
    styleUrl: './add-edit-product.component.scss'
})
export class AddEditProductComponent {

    form = inject(FormBuilder).group({
        id: new FormControl<number>(0),
        name: new FormControl<string>('', [Validators.required]),
        price: new FormControl<number>(0),
        notes: new FormControl<string>(''),
        reviews: new FormControl<UserReview[]>([]),
        factoryAddress: new FormControl<Address | null>(null)
    });

    changeThePriceValue() {
        this.form.disable();
    }


    constructor() {
        const p: Product =
        {
            id: 1, name: 'bamba',
            price: 12,
            reviews: [
                { userName: 'David', review: 'מוצר מדהים ממש' }, 
                { userName: 'Naama', review: 'לא לגעת גועל נפש' }],
            notes: 'blablalbas', 
            factoryAddress: {
                homeNumber: 12, street: 'aloni'
            }
        };
        this.form.patchValue(p);
    }
}
