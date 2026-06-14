import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { ReleaseNotesComponent } from './release-notes.component';
import { APP_CONFIG, appConfig } from 'app/app.config';
import { createMatDialogRefMock, provideDialog } from 'testing/component-setup';
import { provideMockSettingsService } from 'testing/test-mocks';

describe('ReleaseNotesComponent', () => {
  let component: ReleaseNotesComponent;
  let fixture: ComponentFixture<ReleaseNotesComponent>;

  const releaseNotesData = {
    en: [{ title: 'v4.3.0', news: ['English note'] }],
    ru: [{ title: 'v4.3.0', news: ['Русская заметка'] }],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReleaseNotesComponent],
      imports: [TranslateModule.forRoot()],
      providers: [
        ...provideDialog(releaseNotesData, createMatDialogRefMock()),
        provideMockSettingsService(),
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
});
