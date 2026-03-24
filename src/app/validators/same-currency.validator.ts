import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function sameCurrencyValidator(
  fromControlName: string,
  toControlName: string,
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const from = group.get(fromControlName)?.value;
    const to = group.get(toControlName)?.value;
    if (!from?.id || !to?.id) {
      return null;
    }
    if (from.id === to.id) {
      return { sameCurrency: true };
    }
    return null;
  };
}
