import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CmLineClamp } from './line-clamp';

@Component({
  imports: [CmLineClamp],
  template: `<p [cmLineClamp]="lines">Test content</p>`
})
class TestHostComponent {
  lines: number | string = 1;
}

describe('CmLineClamp', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
  });

  const getElement = (): HTMLElement => {
    return fixture.debugElement.query(By.directive(CmLineClamp)).nativeElement;
  };

  const getDirective = (): CmLineClamp => {
    return fixture.debugElement.query(By.directive(CmLineClamp)).injector.get(CmLineClamp);
  };

  describe('host', () => {
    it('should add class to host element', () => {
      fixture.detectChanges();

      expect(getElement().classList.contains('cm-line-clamp')).toBe(true);
    });
  });

  describe('default value', () => {
    it('should have default value of 1', () => {
      fixture.detectChanges();
      const directive = getDirective();

      expect(directive.cmLineClamp()).toBe(1);
    });
  });

  describe('styles computation', () => {
    describe('single line', () => {
      beforeEach(() => {
        hostComponent.lines = 1;
        fixture.detectChanges();
      });

      it('should set -webkit-line-clamp to 1', () => {
        const element = getElement();

        expect(element.style.webkitLineClamp).toBe('1');
      });

      it('should set word-break to "break-all"', () => {
        const element = getElement();

        expect(element.style.wordBreak).toBe('break-all');
      });

      it('should return correct styles object', () => {
        const directive = getDirective();

        expect(directive.styles()).toEqual({
          lineClamp: 1,
          wordBreak: 'break-all'
        });
      });
    });

    describe('multiple lines', () => {
      beforeEach(() => {
        hostComponent.lines = 3;
        fixture.detectChanges();
      });

      it('should set -webkit-line-clamp to specified value', () => {
        const element = getElement();

        expect(element.style.webkitLineClamp).toBe('3');
      });

      it('should not set word-break', () => {
        const element = getElement();

        expect(element.style.wordBreak).toBe('');
      });

      it('should return styles without wordBreak', () => {
        const directive = getDirective();

        expect(directive.styles()).toEqual({
          lineClamp: 3
        });
      });
    });
  });
});