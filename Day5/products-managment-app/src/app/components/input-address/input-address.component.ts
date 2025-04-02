import { Component, inject } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Address } from '../../model/product.model';

@Component({
    selector: 'app-input-address',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: InputAddressComponent,
            multi: true
        },
        {
            provide:NG_VALIDATORS,
            useExisting: InputAddressComponent,
            multi: true
        }
    ],
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule],
    templateUrl: './input-address.component.html',
    styleUrl: './input-address.component.scss'
})
export class InputAddressComponent implements ControlValueAccessor, Validator {

    onChange = (val: Address) => { };
    onValidateChanged = () => { };

    form = inject(FormBuilder).group({
        homeNumber: new FormControl<number>(0, [Validators.required]),
        street: new FormControl<string>('', [Validators.required])
    });

    constructor() {
        this.form.valueChanges.subscribe(val => {
            this.onChange(this.form.value as Address);
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
        return { 'AddressNotValid': '', '': '' }

    }

    writeValue(obj: Address): void {
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
