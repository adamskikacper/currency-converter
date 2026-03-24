export interface CurrencyDTO {
  id: number;
  name: string;
  short_code: string;
  code: string;
  precision: number;
  subunit: number;
  symbol: string;
  symbol_first: boolean;
  decimal_mark: string;
  thousands_separator: string;
}

export interface Currency {
  id: number;
  name: string;
  short_code: string;
  symbol: string;
}

export interface CurrencyConversionDTO {
  amount: number;
  date: string;
  from: string;
  timestamp: number;
  to: string;
  value: number;
}

export interface CurrencyConversionValue {
  value: number;
  fromAmount: number;
}

export interface CurrencyConversionRequest {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
}
