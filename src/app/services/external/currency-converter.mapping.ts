import { Injectable } from '@angular/core';

import { Currency, CurrencyDTO } from '../../model/currency.model';

@Injectable({
  providedIn: 'root',
})
export class CurrencyConverterMapping {
  mapCurrenciesDTOToCurrencies(dtos: CurrencyDTO[]): Currency[] {
    return dtos.map((dto: CurrencyDTO) => {
      return {
        id: dto.id,
        name: dto.name,
      };
    });
  }
}
