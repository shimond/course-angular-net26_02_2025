import { Component, inject } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserReview } from '../../model/product.model';

@Component({
    selector: 'app-input-user-review',
    imports: [ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: InputUserReviewComponent,
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: InputUserReviewComponent,
            multi: true
        }
    ],
    templateUrl: './input-user-review.component.html',
    styleUrl: './input-user-review.component.scss'
})
export class InputUserReviewComponent implements ControlValueAccessor, Validator {

    onChange = (val: UserReview) => { };
    onValidateChanged = () => { };

    form = inject(FormBuilder).group({
        userName: new FormControl<string>('', [Validators.required]),
        review: new FormControl<string>('', [Validators.required])
    });

    constructor() {
        this.form.valueChanges.subscribe(val => {
            this.onChange(this.form.value as UserReview);
            this.onValidateChanged();
        });
    }

    registerOnValidatorChange?(fn: () => void): void {
        this.onValidateChanged = fn;
    }

    validate(control: AbstractControl<any, any>): ValidationErrors | null {
        if (this.form.valid) {
            return null;
        }
        return { 'UserReviewNotValid': '', '': '' }

    }

    writeValue(obj: UserReview): void {
        this.form.patchValue(obj);
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
    }

    setDisabledState(isDisabled: boolean) {
        if (isDisabled) {
            this.form.disable();
        } else {
            this.form.enable();
        }
    }
}
