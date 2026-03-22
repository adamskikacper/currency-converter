import { inject, Injectable } from '@angular/core';
import { Currency, CurrencyDTO } from '../../model/currency.model';
import { ResponseDTO } from '../../model/common.model';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ENDPOINTS } from '../../constants/endpoints';
import { environment } from '../../../environments/environment';
import { CurrencyConverterMapping } from './currency-converter.mapping';

@Injectable({
  providedIn: 'root',
})
export class CurrencyConverterExternal {
  private http = inject(HttpClient);
  private currencyConverterMapping = inject(CurrencyConverterMapping);

  getCurrencies(): Observable<Currency[]> {
    const queryUrl = `${environment.apiUrl}${ENDPOINTS.CURRENCIES}`;

    return this.http
      .get<ResponseDTO<CurrencyDTO[]>>(queryUrl)
      .pipe(
        map((response: ResponseDTO<CurrencyDTO[]>) =>
          this.currencyConverterMapping.mapCurrenciesDTOToCurrencies(response.response),
        ),
      );
  }
}
