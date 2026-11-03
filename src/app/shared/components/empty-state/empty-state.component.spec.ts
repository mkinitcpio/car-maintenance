import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { EmptyStateComponent } from './empty-state.component';
import { EmptyStateIllustration } from './empty-state-illustration';
import { SearchIllustrationComponent } from './illustrations/search-illustration';

@Component({
  imports: [EmptyStateComponent, EmptyStateIllustration, SearchIllustrationComponent],
  template: '<cm-empty-state><cm-search-illustration cmEmptyStateIllustration /></cm-empty-state>',
})
class HostWithCustomIllustrationComponent {}

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

  it('renders the default illustration when nothing is projected', () => {
    const wrapper = fixture.nativeElement.querySelector('.empty-state__illustration');
    expect(wrapper.querySelector('cm-paper-illustration svg')).toBeTruthy();
    expect(wrapper.querySelector('cm-search-illustration')).toBeFalsy();
  });

  it('renders a projected illustration instead of the default one', () => {
    const hostFixture = TestBed.createComponent(HostWithCustomIllustrationComponent);
    hostFixture.detectChanges();

    const wrapper = hostFixture.nativeElement.querySelector('.empty-state__illustration');
    expect(wrapper.querySelector('cm-search-illustration svg')).toBeTruthy();
    expect(wrapper.querySelector('cm-paper-illustration')).toBeFalsy();
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
