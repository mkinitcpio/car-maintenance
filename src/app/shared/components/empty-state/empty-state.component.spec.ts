import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { EmptyStateComponent } from './empty-state.component';

describe('EmptyStateComponent', () => {
  let component: EmptyStateComponent;
  let fixture: ComponentFixture<EmptyStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyStateComponent, TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('renders the illustration', () => {
    const svg = fixture.nativeElement.querySelector('svg.empty-state__illustration');
    expect(svg).toBeTruthy();
  });

  it('hides the text when it is not provided', () => {
    expect(fixture.nativeElement.querySelector('.empty-state__text')).toBeFalsy();
  });

  it('renders the translated text', () => {
    fixture.componentRef.setInput('text', 'PAGES.EMPTY.TEXT');
    fixture.detectChanges();

    const text = fixture.nativeElement.querySelector('.empty-state__text');
    expect(text).toBeTruthy();
  });
});
