import { Component, inject, Injector, Input, OnInit } from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormControlName,
  FormGroup,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DropdownItem } from './dropdown.model';

@Component({
  selector: 'app-dropdown',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DropdownComponent,
      multi: true,
    },
  ],
})
export class DropdownComponent implements OnInit, ControlValueAccessor {
  @Input() items: DropdownItem[] = [];
  @Input() label = '';

  control = new FormControl<DropdownItem | string | undefined>(undefined);
  onChanged = (value: DropdownItem | DropdownItem[]) => {};
  onTouched = () => {};

  private injector = inject(Injector);

  ngOnInit() {
    const ngControl = this.injector.get(NgControl, null, { self: true, optional: true });

    if (ngControl instanceof FormControlName) {
      const container = this.injector.get(ControlContainer).control as FormGroup;
      const name = ngControl.name;
      if (name != null) {
        this.control = container.controls[name] as FormControl<DropdownItem | string | undefined>;
      }
    }
  }

  writeValue(value: DropdownItem | string | undefined): void {
    this.control.setValue(value, { emitEvent: false });
  }

  registerOnChange(onChange: any) {
    this.onChanged = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  displayValue(item: DropdownItem | string | undefined): string {
    if (typeof item === 'string') return item;
    return item?.label || item?.value || '';
  }
}
