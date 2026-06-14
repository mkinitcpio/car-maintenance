import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppearanceSettingsPageComponent } from './appearance-settings-page.component';
import { SettingsService } from '../../settings.service';
import { ThemeService } from '@core/services/theme';
import { ColorEnum } from '../../colors-enum';
import { provideMockSettingsService } from 'testing/test-mocks';

describe('AppearanceSettingsPageComponent', () => {
  let component: AppearanceSettingsPageComponent;
  let fixture: ComponentFixture<AppearanceSettingsPageComponent>;
  let settings: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppearanceSettingsPageComponent],
      providers: [provideMockSettingsService(), { provide: ThemeService, useValue: {} }],
    })
      .overrideComponent(AppearanceSettingsPageComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(AppearanceSettingsPageComponent);
    component = fixture.componentInstance;
    settings = TestBed.inject(SettingsService);
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('persists the animations toggle', () => {
    component.onAnimationsChanged(false);
    expect(settings.setAnimations).toHaveBeenCalledWith(false);
  });

  it('persists the selected theme color', () => {
    component.onSelectColor(ColorEnum.Default);
    expect(settings.changeThemeColor).toHaveBeenCalledWith(ColorEnum.Default);
  });

  it('persists the appearance scheme', () => {
    component.setAppearance('dark');
    expect(settings.setAppearance).toHaveBeenCalledWith('dark');
  });
});
