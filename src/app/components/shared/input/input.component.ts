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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true,
    },
  ],
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() label = '';

  control = new FormControl<string | undefined>(undefined);

  private injector = inject(Injector);

  ngOnInit() {
    const ngControl = this.injector.get(NgControl, null, { self: true, optional: true });

    if (ngControl instanceof FormControlName) {
      const container = this.injector.get(ControlContainer).control as FormGroup;
      const name = ngControl.name;
      if (name != null) {
        this.control = container.controls[name] as FormControl<string | undefined>;
      }
    }
  }

  writeValue(value: string | null | undefined): void {
    this.control.setValue(value ?? undefined, { emitEvent: false });
  }

  registerOnChange(): void {}

  registerOnTouched(): void {}

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable({ emitEvent: false });
    } else {
      this.control.enable({ emitEvent: false });
    }
  }
}
