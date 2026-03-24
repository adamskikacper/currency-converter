import { Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Currency, CurrencyConversionValue } from '../../../../../model/currency.model';

@Component({
  selector: 'app-conversion-result',
  imports: [DecimalPipe],
  templateUrl: './conversion-result.component.html',
  styleUrl: './conversion-result.component.scss',
})
export class ConversionResultComponent {
  @Input() isLoading = false;
  @Input() conversionValue: CurrencyConversionValue | undefined = undefined;
  @Input() fromCurrency: Currency | undefined = undefined;
  @Input() toCurrency: Currency | undefined = undefined;

  get exchangeRate(): number | undefined {
    if (!this.conversionValue || !this.conversionValue.fromAmount) {
      return undefined;
    }

    return this.conversionValue.value / this.conversionValue.fromAmount;
  }
}
