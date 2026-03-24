import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import {
  Currency,
  CurrencyConversionRequest,
  CurrencyConversionValue,
} from '../../../../model/currency.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutocompleteComponent } from '../../../shared/autocomplete/autocomplete.component';
import { InputNumberComponent } from '../../../shared/input-number/input-number.component';
import { ConversionResultComponent } from './conversion-result/conversion-result.component';
import { FORM_ERROR_MESSAGES, FORM_VALIDATORS } from '../../../../constants/form-validation';
import { sameCurrencyValidator } from '../../../../validators/same-currency.validator';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import {
  AutocompleteCompleteEvent,
  AutocompleteItem,
} from '../../../shared/autocomplete/autocomplete.model';

enum FormControls {
  AMOUNT = 'amount',
  FROM_CURRENCY = 'fromCurrency',
  TO_CURRENCY = 'toCurrency',
}

@Component({
  selector: 'app-currency-converter',
  imports: [
    ReactiveFormsModule,
    AutocompleteComponent,
    InputNumberComponent,
    ConversionResultComponent,
  ],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss',
})
export class CurrencyConverterComponent implements OnInit, OnChanges, OnDestroy {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() currencies: Currency[] = [];
  @Input() currencyConversionValue: CurrencyConversionValue | undefined = undefined;
  @Input() isLoading = false;
  @Output() convertCurrencyClicked = new EventEmitter<CurrencyConversionRequest>();

  filteredFromCurrencies: AutocompleteItem[] = [];
  filteredToCurrencies: AutocompleteItem[] = [];

  form: FormGroup = new FormGroup({});
  formControls = FormControls;
  formErrorMessages = FORM_ERROR_MESSAGES;
  formValidators = FORM_VALIDATORS;

  private subscription = new Subscription();

  private formBuilder = inject(FormBuilder);

  get fromCurrency(): Currency | undefined {
    const selectedCurrency = this.form.get(FormControls.FROM_CURRENCY)?.value;
    if (!selectedCurrency) {
      return undefined;
    }
    return this.currencies.find((currency) => currency.short_code === selectedCurrency.id);
  }

  get toCurrency(): Currency | undefined {
    const selectedCurrency = this.form.get(FormControls.TO_CURRENCY)?.value;
    if (!selectedCurrency) {
      return undefined;
    }
    return this.currencies.find((currency) => currency.short_code === selectedCurrency.id);
  }

  get amount(): number | undefined {
    return this.form.get(FormControls.AMOUNT)?.value;
  }

  ngOnInit() {
    this.initializeForm();
    this.setupFormSubscription();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currencies']) {
      const currencyItems = this.mapCurrenciesToAutocompleteItems(this.currencies);
      this.filteredFromCurrencies = [...currencyItems];
      this.filteredToCurrencies = [...currencyItems];
    }
  }

  private initializeForm() {
    this.form = this.formBuilder.group(
      {
        [FormControls.FROM_CURRENCY]: [undefined, Validators.required],
        [FormControls.TO_CURRENCY]: [undefined, Validators.required],
        [FormControls.AMOUNT]: [
          undefined,
          [Validators.required, Validators.min(FORM_VALIDATORS.MIN_AMOUNT)],
        ],
      },
      {
        validators: [sameCurrencyValidator(FormControls.FROM_CURRENCY, FormControls.TO_CURRENCY)],
      },
    );
  }

  public filterFromCurrencies(event: AutocompleteCompleteEvent) {
    const query = event.query.toLowerCase();
    this.filteredFromCurrencies = this.mapCurrenciesToAutocompleteItems(
      this.currencies.filter(
        (currency) =>
          currency.name.toLowerCase().includes(query) ||
          currency.short_code.toLowerCase().includes(query),
      ),
    );
  }

  public filterToCurrencies(event: AutocompleteCompleteEvent) {
    const query = event.query.toLowerCase();
    this.filteredToCurrencies = this.mapCurrenciesToAutocompleteItems(
      this.currencies.filter(
        (currency) =>
          currency.name.toLowerCase().includes(query) ||
          currency.short_code.toLowerCase().includes(query),
      ),
    );
  }

  private mapCurrenciesToAutocompleteItems(currencies: Currency[]): AutocompleteItem[] {
    return currencies.map((currency) => ({
      id: currency.short_code,
      label: currency.name,
      code: currency.short_code,
    }));
  }

  private setupFormSubscription() {
    this.subscription.add(
      this.form.valueChanges
        .pipe(
          debounceTime(500),
          distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
        )
        .subscribe(() => {
          this.performConversion();
        }),
    );
  }

  private performConversion() {
    if (this.form.invalid) {
      return;
    }

    const amount = this.amount;
    const fromCode = this.fromCurrency?.short_code;
    const toCode = this.toCurrency?.short_code;

    if (!amount || !fromCode || !toCode || amount <= 0) {
      return;
    }

    this.convertCurrencyClicked.emit({
      amount,
      fromCurrency: fromCode,
      toCurrency: toCode,
    });
  }
}
