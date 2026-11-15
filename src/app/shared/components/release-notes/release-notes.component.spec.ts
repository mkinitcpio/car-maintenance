import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { ReleaseNotesComponent } from './release-notes.component';
import { APP_CONFIG, appConfig } from 'app/app.config';
import { ElectronService } from '@core/services';
import { createMatDialogRefMock, provideDialog } from 'testing/component-setup';
import { provideMockElectronService, provideMockSettingsService } from 'testing/test-mocks';

describe('ReleaseNotesComponent', () => {
  let component: ReleaseNotesComponent;
  let fixture: ComponentFixture<ReleaseNotesComponent>;

  const releaseNotesData = {
    en: [{ title: 'v4.3.0', news: ['English note'] }],
    ru: [{ title: 'v4.3.0', news: ['Русская заметка'] }],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReleaseNotesComponent, TranslateModule.forRoot()],
      providers: [
        ...provideDialog(releaseNotesData, createMatDialogRefMock()),
        provideMockSettingsService(),
        provideMockElectronService(),
        { provide: APP_CONFIG, useValue: appConfig },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ReleaseNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('selects the release notes for the active language', () => {
    expect(component.releaseNotes).toBe(releaseNotesData.en);
  });

  it('opens a link from the release notes externally', () => {
    const electron: any = TestBed.inject(ElectronService);
    const link = document.createElement('a');
    link.href = 'https://example.com';
    const event = { target: link, preventDefault: vi.fn() } as unknown as MouseEvent;

    component.onListClick(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(electron.shell.openExternal).toHaveBeenCalledWith('https://example.com/');
  });

  it('ignores clicks that are not on a link', () => {
    const electron: any = TestBed.inject(ElectronService);
    const event = { target: document.createElement('span'), preventDefault: vi.fn() } as unknown as MouseEvent;

    component.onListClick(event);

    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(electron.shell.openExternal).not.toHaveBeenCalled();
  });
});
