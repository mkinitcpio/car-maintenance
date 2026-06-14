import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DateAdapter } from '@angular/material/core';

import { AppComponent } from './app.component';
import { DataBaseService } from './core/database';
import { SettingsService } from './shared/components/settings/settings.service';
import { ThemeService } from '@core/services/theme';
import { createDataBaseServiceMock, createSettingsServiceMock } from 'testing/test-mocks';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let settings: any;
  let database: any;
  let iconRegistry: { addSvgIcon: jasmine.Spy; addSvgIconInNamespace: jasmine.Spy; setDefaultFontSetClass: jasmine.Spy };

  beforeEach(async () => {
    settings = createSettingsServiceMock();
    database = createDataBaseServiceMock();
    iconRegistry = {
      addSvgIcon: jasmine.createSpy('addSvgIcon'),
      addSvgIconInNamespace: jasmine.createSpy('addSvgIconInNamespace'),
      setDefaultFontSetClass: jasmine.createSpy('setDefaultFontSetClass'),
    };

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: DataBaseService, useValue: database },
        { provide: SettingsService, useValue: settings },
        { provide: ThemeService, useValue: { setAppColors: jasmine.createSpy(), setColorScheme: jasmine.createSpy() } },
        { provide: MatIconRegistry, useValue: iconRegistry },
        { provide: DomSanitizer, useValue: { bypassSecurityTrustResourceUrl: (url: string) => url, sanitize: () => '' } },
        { provide: DateAdapter, useValue: { setLocale: jasmine.createSpy('setLocale') } },
      ],
    })
      .overrideComponent(AppComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
  });

  it('creates the app', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('registers the application svg icons', () => {
    expect(iconRegistry.addSvgIcon).toHaveBeenCalled();
    expect(iconRegistry.addSvgIconInNamespace).toHaveBeenCalledWith(
      'illustrations',
      jasmine.any(String),
      jasmine.anything(),
    );
    expect(iconRegistry.setDefaultFontSetClass).toHaveBeenCalledWith('material-symbols-rounded');
  });

  it('initialises settings and the database on startup', () => {
    expect(settings.init).toHaveBeenCalled();
    expect(database.initDataBase).toHaveBeenCalled();
  });
});
