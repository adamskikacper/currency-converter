import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencySwitcherComponent } from './currency-switcher.component';

describe('CurrencySwitcherComponent', () => {
  let component: CurrencySwitcherComponent;
  let fixture: ComponentFixture<CurrencySwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencySwitcherComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencySwitcherComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
