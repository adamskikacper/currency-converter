import { Injectable } from '@angular/core';

import {
  Currency,
  CurrencyConversionValue,
  CurrencyConversionDTO,
  CurrencyDTO,
} from '../../model/currency.model';

@Injectable({
  providedIn: 'root',
})
export class CurrencyConverterMapper {
  mapCurrenciesDTOToCurrencies(dto: CurrencyDTO[]): Currency[] {
    return dto.map((dto: CurrencyDTO) => {
      return {
        id: dto.id,
        name: dto.name,
        short_code: dto.short_code,
        symbol: dto.symbol,
      };
    });
  }

  mapCurrencyConversionDTOToCurrencyConversionValue(
    dto: CurrencyConversionDTO,
  ): CurrencyConversionValue {
    return {
      value: dto.value,
    };
  }
}
