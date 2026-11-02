import type { Mock } from "vitest";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { HomeComponent } from './home.component';
import { ReleaseNotesService } from '@shared/components/release-notes/release-notes.service';
import { SettingsService } from '@shared/components/settings/settings.service';
import { DialogManagerService } from '@shared/services/dialog-manager.service';
import { SideNavigationTrackerService } from './side-navigation-tracker.service';
import { createSettingsServiceMock } from 'testing/test-mocks';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let releaseNotesService: {
        isFirstAppStartAfterUpdate: Mock;
        showReleaseNotes: Mock;
    };
    let dialogManager: {
        openCurrencyDialog: Mock;
    };
    let router: {
        navigate: Mock;
    };
    let settings: any;

    beforeEach(async () => {
        releaseNotesService = {
            isFirstAppStartAfterUpdate: vi.fn().mockName('isFirstAppStartAfterUpdate').mockReturnValue(false),
            showReleaseNotes: vi.fn().mockName('showReleaseNotes').mockReturnValue(of(undefined)),
        };
        dialogManager = { openCurrencyDialog: vi.fn().mockName('openCurrencyDialog').mockReturnValue(of(true)) };
        router = { navigate: vi.fn().mockName('navigate') };
        settings = createSettingsServiceMock();

        await TestBed.configureTestingModule({
            imports: [HomeComponent],
            providers: [
                { provide: ReleaseNotesService, useValue: releaseNotesService },
                { provide: SettingsService, useValue: settings },
                { provide: Router, useValue: router },
                { provide: DialogManagerService, useValue: dialogManager },
                SideNavigationTrackerService,
            ],
        })
            .overrideComponent(HomeComponent, { set: { template: '', imports: [] } })
            .compileComponents();

        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
    });

    it('creates', () => {
        expect(component).toBeTruthy();
    });

    it('navigates to the configured start page on init', () => {
        fixture.detectChanges();
        expect(router.navigate).toHaveBeenCalledWith([settings.settings.startPage]);
    });

    it('does not show release notes when it is not the first start after an update', () => {
        releaseNotesService.isFirstAppStartAfterUpdate.mockReturnValue(false);
        fixture.detectChanges();
        expect(releaseNotesService.showReleaseNotes).not.toHaveBeenCalled();
    });

    it('shows release notes on the first start after an update', () => {
        releaseNotesService.isFirstAppStartAfterUpdate.mockReturnValue(true);
        fixture.detectChanges();
        expect(releaseNotesService.showReleaseNotes).toHaveBeenCalled();
    });
});
