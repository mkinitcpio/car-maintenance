import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencySettingsPageComponent } from './currency-settings-page.component';
import { SettingsService } from '../../settings.service';
import { CurrencyEnum } from '../../currency.enum';
import { provideMockSettingsService } from 'testing/test-mocks';

describe('CurrencySettingsPageComponent', () => {
  let component: CurrencySettingsPageComponent;
  let fixture: ComponentFixture<CurrencySettingsPageComponent>;
  let settings: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencySettingsPageComponent],
      providers: [provideMockSettingsService()],
    })
      .overrideComponent(CurrencySettingsPageComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(CurrencySettingsPageComponent);
    component = fixture.componentInstance;
    settings = TestBed.inject(SettingsService);
    fixture.componentRef.setInput('currencyOptions', [
      { name: 'USD', icon: 'usd', value: CurrencyEnum.Usd },
      { name: 'EUR', icon: 'eur', value: CurrencyEnum.Eur },
    ]);
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('starts on the currency stored in settings', () => {
    expect(component.currentCurrency$$().value).toBe(CurrencyEnum.Usd);
  });

  it('persists the chosen currency and reflects it in the computed selection', () => {
    component.onSelectCurrency(CurrencyEnum.Eur);

    expect(settings.setCurrency).toHaveBeenCalledWith(CurrencyEnum.Eur);
    expect(component.currentCurrency$$().value).toBe(CurrencyEnum.Eur);
  });
});
