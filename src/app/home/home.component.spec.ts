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
  let releaseNotesService: { isFirstAppStartAfterUpdate: jasmine.Spy; showReleaseNotes: jasmine.Spy };
  let dialogManager: { openCurrencyDialog: jasmine.Spy };
  let router: { navigate: jasmine.Spy };
  let settings: any;

  beforeEach(async () => {
    releaseNotesService = {
      isFirstAppStartAfterUpdate: jasmine.createSpy('isFirstAppStartAfterUpdate').and.returnValue(false),
      showReleaseNotes: jasmine.createSpy('showReleaseNotes').and.returnValue(of(undefined)),
    };
    dialogManager = { openCurrencyDialog: jasmine.createSpy('openCurrencyDialog').and.returnValue(of(true)) };
    router = { navigate: jasmine.createSpy('navigate') };
    settings = createSettingsServiceMock();

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: ReleaseNotesService, useValue: releaseNotesService },
        { provide: SettingsService, useValue: settings },
        { provide: Router, useValue: router },
        { provide: DialogManagerService, useValue: dialogManager },
        SideNavigationTrackerService,
      ],
    })
      .overrideComponent(HomeComponent, { set: { template: '' } })
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
    releaseNotesService.isFirstAppStartAfterUpdate.and.returnValue(false);
    fixture.detectChanges();
    expect(releaseNotesService.showReleaseNotes).not.toHaveBeenCalled();
  });

  it('shows release notes on the first start after an update', () => {
    releaseNotesService.isFirstAppStartAfterUpdate.and.returnValue(true);
    fixture.detectChanges();
    expect(releaseNotesService.showReleaseNotes).toHaveBeenCalled();
  });
});
