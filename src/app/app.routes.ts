import { Routes } from '@angular/router';

import { NAV_LINKS } from './constants/navigation-paths';
import { CurrencyConversionComponent } from './components/pages/currency-conversion/currency-conversion.component';

export const routes: Routes = [
  { path: '', redirectTo: NAV_LINKS.CURRENCY_CONVERSION, pathMatch: 'full' },
  {
    path: NAV_LINKS.CURRENCY_CONVERSION,
    component: CurrencyConversionComponent,
  },
  { path: '**', redirectTo: NAV_LINKS.CURRENCY_CONVERSION, pathMatch: 'full' },
];
