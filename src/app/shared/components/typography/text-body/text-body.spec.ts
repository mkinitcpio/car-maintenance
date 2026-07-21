import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CmTextBody } from './text-body';

@Component({
  template: `<span [textBody]="value()"></span>`,
  imports: [CmTextBody],
})
class TestHostComponent {
  value = signal('text');
}

describe('CmTextBody', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let directive: CmTextBody;
  let host: TestHostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();

    const debugEl = fixture.debugElement.query(
      By.directive(CmTextBody)
    );

    directive = debugEl.injector.get(CmTextBody);
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });

  it('should create element class', () => {
    host.value.set('b1');
    fixture.detectChanges();

    expect(directive['classList']()).toEqual([
      'cm-text-body',
      'cm-text-body--b1',
    ]);
  });

  it('should create element and modifier classes', () => {
    host.value.set('b1:strong');
    fixture.detectChanges();

    expect(directive['classList']()).toEqual(jasmine.arrayContaining([
      'cm-text-body',
      'cm-text-body--b1',
      'cm-text-body--strong',
    ]));
  });
});
