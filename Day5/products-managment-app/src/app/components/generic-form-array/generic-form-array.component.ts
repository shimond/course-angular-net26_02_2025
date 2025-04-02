import { Component, inject, input, Input, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-generic-form-array',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: GenericFormArrayComponent,
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: GenericFormArrayComponent,
            multi: true
        }
    ],
    imports: [CommonModule, MatButtonModule, MatIconModule],
    templateUrl: './generic-form-array.component.html',
    styleUrls: ['./generic-form-array.component.scss']
})
export class GenericFormArrayComponent<T = string> implements OnInit, ControlValueAccessor, Validator {
    allowAdd = input<boolean>(true);
    allowDelete = input<boolean>(true);
    autoAddItem = input<boolean>(false);
    removeText = input<string>('הסר');
    addText = input<string>('הוסף');
    itemTemplate =  input.required<TemplateRef<any>>();
    valuesArray = inject(FormBuilder).array([]);
    callBack: any;
    validationChanged: () => void = () => { };

    constructor() {
        this.valuesArray.valueChanges.subscribe(o => {
            if (this.callBack) {
                this.callBack(o);
                this.validationChanged();
            }
        })
    }

    validate(control: AbstractControl): ValidationErrors | null {
        if (this.valuesArray.valid) {
            return null;
        }
        const res = this.valuesArray.controls.map(control => control.errors);
        return { 'custom-validation': [this.valuesArray.errors, res] };
    }

    registerOnValidatorChange?(fn: () => void): void {
        this.validationChanged = fn;
    }

    ngOnInit(): void {
    }

    setupLastControlListener() {
        // Get the index of the last form control
        const lastControlIndex = this.valuesArray.length - 1;

        if (this.autoAddItem()) {
            // Subscribe to the valueChanges observable of the last control
            this.valuesArray.at(lastControlIndex).valueChanges.subscribe(value => {
                // Check if the control being changed is the last in the array and has a value
                if (value && lastControlIndex === (this.valuesArray.length - 1)) {
                    // Add a new control
                    this.add();


                    // Setup the listener for the new last control
                    this.setupLastControlListener();
                }
            });
        }
    }

    waitForNextCycle(delay: number = 0) {

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(null);
            }, 5000);
        });
    }


    writeValue(values: T[]): void {
        if (!values) {
            return;
        }
        this.valuesArray.clear();
        for (let index = 0; index < values.length; index++) {
            this.add();
        }
        if (this.autoAddItem()) {
            this.add();
        }

        this.valuesArray.patchValue(values, { emitEvent: true });
        if (this.autoAddItem()) {
            this.setupLastControlListener();
        }

    }

    registerOnChange(fn: (arr: T[]) => void): void {
        this.callBack = fn;
    }

    registerOnTouched(fn: any): void {

    }

    setDisabledState?(isDisabled: boolean): void {
        if (isDisabled) {
            this.valuesArray.disable();
        } else {
            this.valuesArray.enable();
        }
    }

    add() {
        this.valuesArray.push(new FormControl<T | null>(null));
    }

    remove(idx: number) {
        this.valuesArray.removeAt(idx);
    }

    removeAll() {
        this.valuesArray.clear();
    }

}