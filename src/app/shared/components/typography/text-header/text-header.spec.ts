import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CmTextHeader } from './text-header';

@Component({
  template: `<span [cmTextHeader]="value()"></span>`,
  imports: [CmTextHeader],
})
class TestHostComponent {
  value = signal('text');
}

describe('CmTextHeader', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let directive: CmTextHeader;
  let host: TestHostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();

    const debugEl = fixture.debugElement.query(
      By.directive(CmTextHeader)
    );

    directive = debugEl.injector.get(CmTextHeader);
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });

  it('should create element class', () => {
    host.value.set('h1');
    fixture.detectChanges();

    expect(directive['classList']()).toEqual([
      'cm-text-header',
      'cm-text-header--h1',
    ]);
  });

  it('should create element and modifier classes', () => {
    host.value.set('h1:strong');
    fixture.detectChanges();

    expect(directive['classList']()).toEqual(jasmine.arrayContaining([
      'cm-text-header',
      'cm-text-header--h1',
      'cm-text-header--strong',
    ]));
  });
});
