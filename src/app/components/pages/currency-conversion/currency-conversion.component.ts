import { Component, inject, OnInit } from '@angular/core';
import { CurrencyConverterComponent } from '../../shared/currency-converter/currency-converter.component';
import { CurrencyConverterInternal } from '../../../services/internal/currency-converter.service';

@Component({
  selector: 'app-currency-conversion',
  imports: [CurrencyConverterComponent],
  templateUrl: './currency-conversion.component.html',
  styleUrl: './currency-conversion.component.scss',
})
export class CurrencyConversionComponent implements OnInit {
  private currencyConverterInternal = inject(CurrencyConverterInternal);

  ngOnInit() {
    this.currencyConverterInternal.getCurrencies().subscribe((response) => {
      console.log(response);
    });
  }
}
