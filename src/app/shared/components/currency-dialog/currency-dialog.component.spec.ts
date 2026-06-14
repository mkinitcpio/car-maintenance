import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CurrencyDialogComponent } from './currency-dialog.component';
import { SettingsService } from '../settings/settings.service';
import { CurrencyEnum } from '../settings/currency.enum';
import { createMatDialogRefMock, provideDialog } from 'testing/component-setup';
import { provideMockSettingsService } from 'testing/test-mocks';

describe('CurrencyDialogComponent', () => {
  let component: CurrencyDialogComponent;
  let fixture: ComponentFixture<CurrencyDialogComponent>;
  let settings: any;
  const dialogRef = createMatDialogRefMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrencyDialogComponent],
      providers: [...provideDialog({}, dialogRef), provideMockSettingsService()],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(CurrencyDialogComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(CurrencyDialogComponent);
    component = fixture.componentInstance;
    settings = TestBed.inject(SettingsService);
  });

  it('returns the option for the currency currently stored in settings', () => {
    expect(component.getCurrentCurrency().value).toBe(CurrencyEnum.Usd);
  });

  it('persists the chosen currency and closes', () => {
    component.onSelectCurrency(CurrencyEnum.Eur);

    expect(settings.setCurrency).toHaveBeenCalledWith(CurrencyEnum.Eur);
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
