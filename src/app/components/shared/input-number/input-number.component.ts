import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-input-number',
  imports: [InputNumberModule, FormsModule],
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberComponent),
      multi: true,
    },
  ],
})
export class InputNumberComponent implements ControlValueAccessor {
  @Input() mode = 'decimal';
  @Input() minFractionDigits = 0;
  @Input() maxFractionDigits = 2;
  @Input() placeholder = '';
  @Input() min: number | undefined = undefined;
  @Input() max: number | undefined = undefined;

  value: number | undefined = undefined;
  disabled = false;
  onChange = (value: number | undefined) => {};
  onTouched = () => {};

  onValueChange(value: number | undefined): void {
    this.value = value;
    this.onChange(value);
  }

  writeValue(value: number | undefined): void {
    this.value = value;
  }

  registerOnChange(fn: (value: number | undefined) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
