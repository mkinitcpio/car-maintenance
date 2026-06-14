import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Subject } from 'rxjs';

import { DashboardComponent } from './dashboard.component';
import { ElectronService } from '@core/services';
import { DialogManagerService } from '@shared/services/dialog-manager.service';
import { ResizeObserverService } from '@shared/services/resize-observer.service';
import { APP_CONFIG, appConfig } from 'app/app.config';
import { provideMockElectronService, provideMockSettingsService } from 'testing/test-mocks';

const resizeObserverMock = { observe: () => new Subject(), ngOnDestroy: () => {} };

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let electron: any;
  let dialogService: { openReleaseNotesDialog: jasmine.Spy; openFeedbackDialog: jasmine.Spy };

  beforeEach(async () => {
    dialogService = {
      openReleaseNotesDialog: jasmine.createSpy('openReleaseNotesDialog'),
      openFeedbackDialog: jasmine.createSpy('openFeedbackDialog'),
    };

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        provideMockElectronService(),
        provideMockSettingsService(),
        { provide: DialogManagerService, useValue: dialogService },
        { provide: APP_CONFIG, useValue: appConfig },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(DashboardComponent, {
        set: {
          template: '',
          providers: [{ provide: ResizeObserverService, useValue: resizeObserverMock }],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    electron = TestBed.inject(ElectronService);
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('opens the source-code page externally', () => {
    component.openGitHub();
    expect(electron.shell.openExternal).toHaveBeenCalledWith(appConfig.sourceCodeUrl);
  });

  it('opens the documentation for the active language', () => {
    component.openDocumentation();
    expect(electron.shell.openExternal).toHaveBeenCalledWith(`${appConfig.documentationUrl}-en`);
  });

  it('opens the release notes dialog', () => {
    component.openReleaseNotes();
    expect(dialogService.openReleaseNotesDialog).toHaveBeenCalled();
  });

  it('opens the feedback dialog', () => {
    component.openFeedbackDialog();
    expect(dialogService.openFeedbackDialog).toHaveBeenCalled();
  });
});
