import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Badge } from './badge';

@Component({
    template: `
        <cm-badge [variant]="variant()" [icon]="icon()" [label]="label()"></cm-badge>
    `,
    changeDetection: 0,
    imports: [Badge],
})
class TestHostComponent {
    variant = signal<'primary' | 'neutral' | 'dangerous'>('primary');
    icon = signal('');
    label = signal('Badge');
}

describe('Badge', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let host: TestHostComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestHostComponent],
        });

        TestBed.inject(MatIconRegistry).addSvgIconLiteral(
            'success',
            TestBed.inject(DomSanitizer).bypassSecurityTrustHtml(
                '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="currentColor"/></svg>'
            )
        );

        fixture = TestBed.createComponent(TestHostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
    });

    function getBadge(): HTMLElement {
        return fixture.debugElement.query(By.css('.badge')).nativeElement as HTMLElement;
    }

    it('should create', () => {
        expect(fixture.debugElement.query(By.directive(Badge))).toBeTruthy();
    });

    it('should render the label', () => {
        expect(getBadge().textContent.trim()).toBe('Badge');
    });

    it('should apply variant class', () => {
        expect(getBadge().classList).toContain('badge--primary');

        host.variant.set('dangerous');
        fixture.detectChanges();

        expect(getBadge().classList).toContain('badge--dangerous');
        expect(getBadge().classList).not.toContain('badge--primary');
    });

    it('should not render icon by default', () => {
        expect(fixture.debugElement.query(By.css('.badge__icon'))).toBeNull();
    });

    it('should render icon when provided', () => {
        host.icon.set('success');
        fixture.detectChanges();

        const icon = fixture.debugElement.query(By.css('.badge__icon'));
        expect(icon).toBeTruthy();
    });
});
