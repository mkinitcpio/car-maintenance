import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { vi } from 'vitest';
import { CmInput } from './input';

@Component({
    template: `
        <cm-input
            [label]="label()"
            [placeholder]="placeholder()"
            [hint]="hint()"
            [type]="type()"
            [invalid]="invalid()"
            [formControl]="control">
        </cm-input>
    `,
    changeDetection: 0,    imports: [CmInput, ReactiveFormsModule],
})
class TestHostComponent {
    label = signal('');
    placeholder = signal('');
    hint = signal('');
    type = signal<'text' | 'password'>('text');
    invalid = signal(false);
    control = new FormControl('');
}

describe('CmInput', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let host: TestHostComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestHostComponent],
        });

        TestBed.inject(MatIconRegistry).addSvgIconLiteral(
            'eye',
            TestBed.inject(DomSanitizer).bypassSecurityTrustHtml(
                '<svg viewBox="0 0 24 24"><path d="M12 5C7 5 2.73 8.11 1 12C2.73 15.89 7 19 12 19C17 19 21.27 15.89 23 12C21.27 8.11 17 5 12 5Z" fill="currentColor"/></svg>'
            )
        );

        fixture = TestBed.createComponent(TestHostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
    });

    function getField(): HTMLInputElement {
        return fixture.debugElement.query(By.css('.input__field')).nativeElement as HTMLInputElement;
    }

    function getWrapper(): HTMLElement {
        return fixture.debugElement.query(By.css('.input')).nativeElement as HTMLElement;
    }

    it('should create', () => {
        expect(fixture.debugElement.query(By.directive(CmInput))).toBeTruthy();
    });

    it('should not render label and show empty hint placeholder by default', () => {
        expect(fixture.debugElement.query(By.css('.input__label'))).toBeNull();

        const hint = fixture.debugElement.query(By.css('.input__hint')).nativeElement as HTMLElement;
        expect(hint.textContent.replace(/\u200b|&#8203;/g, '').trim()).toBe('');
    });

    it('should render label, placeholder and hint', () => {
        host.label.set('Message');
        host.placeholder.set('Your message…');
        host.hint.set('No more than 200 characters.');
        fixture.detectChanges();

        const label = fixture.debugElement.query(By.css('.input__label')).nativeElement as HTMLLabelElement;

        expect(label.textContent.trim()).toBe('Message');
        expect(label.getAttribute('for')).toBe(getField().id);
        expect(getField().placeholder).toBe('Your message…');
        expect(
            (fixture.debugElement.query(By.css('.input__hint')).nativeElement as HTMLElement)
                .textContent.trim()
        ).toBe('No more than 200 characters.');
    });

    it('should write value from form control', () => {
        host.control.setValue('hello');
        fixture.detectChanges();

        expect(getField().value).toBe('hello');
    });

    it('should update form control and emit change on input', () => {
        const spy = vi.fn();
        const component = fixture.debugElement.query(By.directive(CmInput)).componentInstance as CmInput;
        component.change.subscribe(spy);

        getField().value = 'typed';
        getField().dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(host.control.value).toBe('typed');
        expect(spy).toHaveBeenCalledWith('typed');
    });

    it('should mark control touched on blur', () => {
        expect(host.control.touched).toBe(false);

        getField().dispatchEvent(new Event('blur'));
        fixture.detectChanges();

        expect(host.control.touched).toBe(true);
    });

    it('should toggle focused state', () => {
        getField().dispatchEvent(new Event('focus'));
        fixture.detectChanges();

        expect(getWrapper().classList).toContain('input--focused');

        getField().dispatchEvent(new Event('blur'));
        fixture.detectChanges();

        expect(getWrapper().classList).not.toContain('input--focused');
    });

    it('should apply invalid state', () => {
        host.invalid.set(true);
        fixture.detectChanges();

        expect(getWrapper().classList).toContain('input--invalid');
    });

    it('should disable field from form control', () => {
        host.control.disable();
        fixture.detectChanges();

        expect(getField().disabled).toBe(true);
        expect(getWrapper().classList).toContain('input--disabled');
    });

    it('should focus field element', () => {
        const component = fixture.debugElement.query(By.directive(CmInput)).componentInstance as CmInput;

        component.focus();
        fixture.detectChanges();

        expect(document.activeElement).toBe(getField());
    });

    it('should render password field with visibility toggle', () => {
        host.type.set('password');
        fixture.detectChanges();

        expect(getField().type).toBe('password');

        const toggle = fixture.debugElement.query(By.css('.input__toggle'));
        expect(toggle).toBeTruthy();

        toggle.nativeElement.click();
        fixture.detectChanges();

        expect(getField().type).toBe('text');

        toggle.nativeElement.click();
        fixture.detectChanges();

        expect(getField().type).toBe('password');
    });
});
