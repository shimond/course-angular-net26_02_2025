import { Component, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-input-number',
    imports: [],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: InputNumberComponent,
            multi: true
        }
    ],
    templateUrl: './input-number.component.html',
    styleUrl: './input-number.component.scss'
})
export class InputNumberComponent implements ControlValueAccessor {

    isDisabled = signal(false);
    value = signal(0);
    onChange = (val: number) => { };

    plus() {
        this.value.update(x => x + 1);
        this.onChange(this.value());
    }

    minus() {
        this.value.update(x => x - 1);
        this.onChange(this.value());
    }

    writeValue(newValue: number): void {
        console.log('write value', newValue);
        this.value.set(newValue);


    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {

    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled.set(isDisabled);
    }
}
