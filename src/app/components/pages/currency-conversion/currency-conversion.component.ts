import { Component, inject, OnInit } from '@angular/core';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { CurrencyConverterInternal } from '../../../services/internal/currency-converter.service';
import {
  Currency,
  CurrencyConversionRequest,
  CurrencyConversionValue,
} from '../../../model/currency.model';

@Component({
  selector: 'app-currency-conversion',
  imports: [CurrencyConverterComponent],
  templateUrl: './currency-conversion.component.html',
  styleUrl: './currency-conversion.component.scss',
})
export class CurrencyConversionComponent implements OnInit {
  currencies: Currency[] = [];
  currencyConversionValue: CurrencyConversionValue | undefined = undefined;
  isLoading = false;

  private currencyConverterInternal = inject(CurrencyConverterInternal);

  ngOnInit() {
    this.getCurrencies();
  }

  onConvertCurrencyClicked(request: CurrencyConversionRequest) {
    this.isLoading = true;
    this.convertCurrency(request);
  }

  private getCurrencies() {
    this.currencyConverterInternal.getCurrencies().subscribe((response: Currency[]) => {
      this.currencies = response;
    });
  }

  private convertCurrency(request: CurrencyConversionRequest) {
    this.currencyConverterInternal.getCurrencyConversionValue(request).subscribe((response) => {
      this.currencyConversionValue = response;
      this.isLoading = false;
    });
  }
}
