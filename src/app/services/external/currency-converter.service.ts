import { inject, Injectable } from '@angular/core';
import {
  Currency,
  CurrencyConversionDTO,
  CurrencyConversionRequest,
  CurrencyConversionValue,
  CurrencyDTO,
} from '../../model/currency.model';
import { ResponseDTO } from '../../model/common.model';
import { map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ENDPOINTS, HTTP_PARAMS } from '../../constants/endpoints';
import { environment } from '../../../environments/environment';
import { CurrencyConverterMapper } from './currency-converter.mapper';

@Injectable({
  providedIn: 'root',
})
export class CurrencyConverterExternal {
  private http = inject(HttpClient);
  private currencyConverterMapper = inject(CurrencyConverterMapper);

  getCurrencies(): Observable<Currency[]> {
    const queryUrl = `${environment.apiUrl}${ENDPOINTS.CURRENCIES}`;

    return this.http
      .get<ResponseDTO<CurrencyDTO[]>>(queryUrl)
      .pipe(
        map((response: ResponseDTO<CurrencyDTO[]>) =>
          this.currencyConverterMapper.mapCurrenciesDTOToCurrencies(response.response),
        ),
      );
  }

  getCurrencyConversionValue(
    request: CurrencyConversionRequest,
  ): Observable<CurrencyConversionValue> {
    const queryUrl = `${environment.apiUrl}${ENDPOINTS.CONVERT}`;

    return this.http
      .get<ResponseDTO<CurrencyConversionDTO>>(queryUrl, {
        params: {
          [HTTP_PARAMS.AMOUNT]: request.amount,
          [HTTP_PARAMS.FROM]: request.fromCurrency,
          [HTTP_PARAMS.TO]: request.toCurrency,
        },
      })
      .pipe(
        map((response: ResponseDTO<CurrencyConversionDTO>) =>
          this.currencyConverterMapper.mapCurrencyConversionDTOToCurrencyConversionValue(
            response.response,
          ),
        ),
      );
  }
}
