import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  Currency,
  CurrencyConversionRequest,
  CurrencyConversionValue,
} from '../../../../model/currency.model';
import { DropdownComponent } from '../../../shared/dropdown/dropdown.component';
import { InputComponent } from '../../../shared/input/input.component';
import { DropdownItem } from '../../../shared/dropdown/dropdown.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../shared/button/button.component';
import { MatFormFieldModule } from '@angular/material/form-field';

enum FormControls {
  AMOUNT = 'amount',
  FROM_CURRENCY = 'fromCurrency',
  TO_CURRENCY = 'toCurrency',
}

@Component({
  selector: 'app-currency-converter',
  imports: [
    DropdownComponent,
    InputComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    ButtonComponent,
  ],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss',
})
export class CurrencyConverterComponent implements OnInit, OnChanges {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() currencies: Currency[] = [];
  @Input() currencyConversionValue: CurrencyConversionValue | null = null;
  @Output() convertCurrencyClicked = new EventEmitter<CurrencyConversionRequest>();
  currencyDropdownItems: DropdownItem[] = [];
  public form: FormGroup = new FormGroup({});
  public formControls = FormControls;

  private formBuilder = inject(FormBuilder);

  get fromCurrency(): Currency | undefined {
    const item = this.form.get(FormControls.FROM_CURRENCY)?.value;
    return this.currencies.find((currency) => currency.short_code === item?.value) || undefined;
  }

  get toCurrency(): Currency | undefined {
    const item = this.form.get(FormControls.TO_CURRENCY)?.value;
    return this.currencies.find((currency) => currency.short_code === item?.value) || undefined;
  }

  get exchangeRate(): string {
    if (!this.currencyConversionValue) return '';
    return (this.currencyConversionValue.value / this.form.get(FormControls.AMOUNT)?.value).toFixed(
      6,
    );
  }

  ngOnInit() {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currencies']) {
      this.currencyDropdownItems = this.mapCurrenciesToDropdownItems(this.currencies);
    }
  }

  private initializeForm() {
    this.form = this.formBuilder.group({
      [FormControls.AMOUNT]: ['', Validators.required],
      [FormControls.FROM_CURRENCY]: ['', Validators.required],
      [FormControls.TO_CURRENCY]: ['', Validators.required],
    });
  }

  private mapCurrenciesToDropdownItems(currencies: Currency[]): DropdownItem[] {
    return currencies.map((currency) => ({
      id: currency.id,
      value: currency.short_code,
      label: `${currency.short_code} — ${currency.name}`,
    }));
  }

  public onConvertCurrencyClicked() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const amount = Number(this.form.get(FormControls.AMOUNT)?.value);
    const fromCode = this.fromCurrency?.short_code;
    const toCode = this.toCurrency?.short_code;

    if (Number.isNaN(amount) || !fromCode || !toCode) {
      return;
    }

    this.convertCurrencyClicked.emit({
      amount,
      fromCurrency: fromCode,
      toCurrency: toCode,
    });
  }
}
