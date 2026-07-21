import { Directive, effect, EffectRef, Component } from '@angular/core';
import { AbstractCmText } from './abstract-text';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Directive({
  selector: '[testCmText]',
})
export class TestCmText extends AbstractCmText {
  baseClass = 'cm-text';
  initEffectRef: EffectRef = effect(() => {});
}

@Component({
  template: `<span testCmText></span>`,
  imports: [TestCmText],
})
class TestHostComponent {}

describe('AbstractCmText', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let directive: TestCmText;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const debugEl = fixture.debugElement.query(
      By.directive(TestCmText)
    );

    directive = debugEl.injector.get(TestCmText);
    element = debugEl.nativeElement;
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });

  it('should create element class', () => {
    directive['computeClasses']('title');
    fixture.detectChanges();

    expect(directive['classList']()).toEqual([
      'cm-text',
      'cm-text--title',
    ]);

    expect(element.className).toBe('cm-text cm-text--title');
  });

  it('should create element and modifier classes', () => {
    directive['computeClasses']('title:bold');
    fixture.detectChanges();

    expect(directive['classList']()).toEqual(jasmine.arrayContaining([
      'cm-text',
      'cm-text--title',
      'cm-text--bold',
    ]));
  });

  describe('empty data', () => {
    it('should throw the error', () => {
      expect(() => {
        directive['computeClasses']('');
      }).toThrowError(
        "Element part in input 'element:?modifier' not provided"
      );
    });
  });
});
