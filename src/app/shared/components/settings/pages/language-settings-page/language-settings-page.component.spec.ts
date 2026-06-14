import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSettingsPageComponent } from './language-settings-page.component';
import { SettingsService } from '../../settings.service';
import { LocaleEnum } from '../../locale-enum';
import { provideMockSettingsService } from 'testing/test-mocks';

describe('LanguageSettingsPageComponent', () => {
  let component: LanguageSettingsPageComponent;
  let fixture: ComponentFixture<LanguageSettingsPageComponent>;
  let settings: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageSettingsPageComponent],
      providers: [provideMockSettingsService()],
    })
      .overrideComponent(LanguageSettingsPageComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(LanguageSettingsPageComponent);
    component = fixture.componentInstance;
    settings = TestBed.inject(SettingsService);
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('persists the selected language', () => {
    component.onSelectLanguage('ru');
    expect(settings.setAppLanguage).toHaveBeenCalledWith('ru');
  });

  it('persists the selected region', () => {
    component.onSelectRegion(LocaleEnum.Ru);
    expect(settings.setRegion).toHaveBeenCalledWith(LocaleEnum.Ru);
  });
});
