import type { Mock } from "vitest";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { of } from 'rxjs';

import { NavigationBarComponent } from './navigation-bar.component';
import { DialogManagerService } from '@shared/services/dialog-manager.service';
import { ElectronService } from '@core/services/electron/electron.service';
import { provideMockElectronService } from 'testing/test-mocks';

describe('NavigationBarComponent', () => {
    let component: NavigationBarComponent;
    let fixture: ComponentFixture<NavigationBarComponent>;
    let dialogManager: {
        openSettingsDialog: Mock;
        openAccountDialog: Mock;
    };
    let electron: any;

    beforeEach(async () => {
        dialogManager = {
            openSettingsDialog: vi.fn().mockName('openSettingsDialog'),
            openAccountDialog: vi.fn().mockName('openAccountDialog'),
        };

        await TestBed.configureTestingModule({
            imports: [NavigationBarComponent],
            providers: [
                { provide: DialogManagerService, useValue: dialogManager },
                provideMockElectronService(),
                { provide: Router, useValue: { events: of(new NavigationEnd(1, '/maintenance', '/maintenance')) } },
            ],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .overrideComponent(NavigationBarComponent, { set: { template: '' } })
            .compileComponents();

        fixture = TestBed.createComponent(NavigationBarComponent);
        component = fixture.componentInstance;
        electron = TestBed.inject(ElectronService);
    });

    it('tracks the current route from navigation end events', () => {
        fixture.detectChanges();
        expect(component.currentRoute).toBe('/maintenance');
    });

    it('opens the settings dialog', () => {
        component.openSettings();
        expect(dialogManager.openSettingsDialog).toHaveBeenCalled();
    });

    it('opens the account dialog', () => {
        component.onOpenAccount();
        expect(dialogManager.openAccountDialog).toHaveBeenCalled();
    });

    it('opens the dev tools of the current window', () => {
        const openDevTools = vi.fn().mockName('openDevTools');
        electron.remote.getCurrentWindow = () => ({ webContents: { openDevTools } });

        component.onOpenDevTools();

        expect(openDevTools).toHaveBeenCalled();
    });
});
