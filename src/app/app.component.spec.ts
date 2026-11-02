import type { Mock } from "vitest";
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
    let iconRegistry: {
        addSvgIconSet: Mock;
        addSvgIconSetInNamespace: Mock;
        setDefaultFontSetClass: Mock;
    };

    beforeEach(async () => {
        settings = createSettingsServiceMock();
        database = createDataBaseServiceMock();
        iconRegistry = {
            addSvgIconSet: vi.fn().mockName('addSvgIconSet'),
            addSvgIconSetInNamespace: vi.fn().mockName('addSvgIconSetInNamespace'),
            setDefaultFontSetClass: vi.fn().mockName('setDefaultFontSetClass'),
        };

        await TestBed.configureTestingModule({
            imports: [AppComponent],
            providers: [
                { provide: DataBaseService, useValue: database },
                { provide: SettingsService, useValue: settings },
                { provide: ThemeService, useValue: { setAppColors: vi.fn(), setColorScheme: vi.fn() } },
                { provide: MatIconRegistry, useValue: iconRegistry },
                { provide: DomSanitizer, useValue: { bypassSecurityTrustResourceUrl: (url: string) => url, sanitize: () => '' } },
                { provide: DateAdapter, useValue: { setLocale: vi.fn().mockName('setLocale') } },
            ],
        })
            .overrideComponent(AppComponent, { set: { template: '', imports: [] } })
            .compileComponents();

        fixture = TestBed.createComponent(AppComponent);
    });

    it('creates the app', () => {
        expect(fixture.componentInstance).toBeTruthy();
    });

    it('registers the application svg icons', () => {
        expect(iconRegistry.addSvgIconSet).toHaveBeenCalledWith(expect.anything());
        expect(iconRegistry.addSvgIconSetInNamespace).toHaveBeenCalledWith('illustrations', expect.anything());
        expect(iconRegistry.addSvgIconSetInNamespace).toHaveBeenCalledWith('currencies', expect.anything());
        expect(iconRegistry.setDefaultFontSetClass).toHaveBeenCalledWith('material-symbols-rounded');
    });

    it('initialises settings and the database on startup', () => {
        expect(settings.init).toHaveBeenCalled();
        expect(database.initDataBase).toHaveBeenCalled();
    });
});
