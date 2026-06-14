import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Subject } from 'rxjs';

import { SettingsComponent } from './settings.component';
import { ResizeObserverService } from '@shared/services/resize-observer.service';
import { createMatDialogRefMock, provideDialog } from 'testing/component-setup';
import { provideMockSettingsService } from 'testing/test-mocks';

const resizeObserverMock = { observe: () => new Subject(), ngOnDestroy: () => {} };

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsComponent],
      providers: [...provideDialog({}, createMatDialogRefMock()), provideMockSettingsService()],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(SettingsComponent, {
        set: {
          template: '',
          providers: [{ provide: ResizeObserverService, useValue: resizeObserverMock }],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('selects a settings group', () => {
    component.selectGroup('about');
    expect(component.selectedSettingsGroup()).toBe('about');
  });

  it('derives the page title from the selected group', () => {
    expect(component.pageTitle()).toBeTruthy();
  });

  it('toggles the sidenav', () => {
    const toggle = jasmine.createSpy('toggle');
    component.sidenav = { toggle } as any;

    component.toggleSideNav();

    expect(toggle).toHaveBeenCalled();
  });
});
