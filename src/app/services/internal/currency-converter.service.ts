import { inject, Injectable } from '@angular/core';
import { Currency } from '../../model/currency.model';
import { Observable } from 'rxjs';
import { CurrencyConverterExternal } from '../external/currency-converter.service';

@Injectable({
  providedIn: 'root',
})
export class CurrencyConverterInternal {
  private currencyConverterExternal = inject(CurrencyConverterExternal);

  getCurrencies(): Observable<Currency[]> {
    return this.currencyConverterExternal.getCurrencies();
  }
}
