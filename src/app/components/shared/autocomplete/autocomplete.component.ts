import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AutocompleteCompleteEvent, AutocompleteItem } from './autocomplete.model';

@Component({
  selector: 'app-autocomplete',
  imports: [AutoCompleteModule, FormsModule],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true,
    },
  ],
})
export class AutocompleteComponent implements ControlValueAccessor {
  @Input() items: AutocompleteItem[] = [];
  @Input() field = 'label';
  @Input() placeholder = '';
  @Input() dropdown = false;
  @Input() showClear = false;
  @Output() completeMethod = new EventEmitter<AutocompleteCompleteEvent>();

  value: AutocompleteItem | undefined = undefined;
  disabled = false;
  onChange = (value: AutocompleteItem | undefined) => {};
  onTouched = () => {};

  onValueChange(value: AutocompleteItem | undefined): void {
    this.value = value;
    this.onChange(value);
  }

  writeValue(value: AutocompleteItem | undefined): void {
    this.value = value;
  }

  registerOnChange(fn: (value: AutocompleteItem | undefined) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
