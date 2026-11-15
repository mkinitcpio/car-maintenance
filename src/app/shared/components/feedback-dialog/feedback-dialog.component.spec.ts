import type { Mock } from "vitest";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { FeedbackDialogComponent } from './feedback-dialog.component';
import { FeedbackRepository } from '@core/repositories/feedback.repository';
import { createMatDialogRefMock, provideDialog } from 'testing/component-setup';

describe('FeedbackDialogComponent', () => {
    let component: FeedbackDialogComponent;
    let fixture: ComponentFixture<FeedbackDialogComponent>;
    let repository: {
        sendFeedback: Mock;
    };

    beforeEach(async () => {
        repository = { sendFeedback: vi.fn().mockName('sendFeedback').mockReturnValue(of(undefined)) };

        await TestBed.configureTestingModule({
            imports: [FeedbackDialogComponent, ReactiveFormsModule],
            providers: [
                ...provideDialog({ type: undefined }, createMatDialogRefMock()),
                { provide: FeedbackRepository, useValue: repository },
            ],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .overrideComponent(FeedbackDialogComponent, { set: { template: '' } })
            .compileComponents();

        fixture = TestBed.createComponent(FeedbackDialogComponent);
        component = fixture.componentInstance;
    });

    it('creates', () => {
        expect(component).toBeTruthy();
    });

    it('sends the feedback form and reports success', () => {
        component.feedbackForm.get('message').setValue('Please add a feature');

        const notifications: any[] = [];
        component.notification$.subscribe((n) => notifications.push(n));

        component.onSend();

        expect(repository.sendFeedback).toHaveBeenCalledWith(component.feedbackForm.value as any);
        expect(notifications[0].text).toBe('Successfully sent!');
    });

    it('reports an error when sending fails', () => {
        component.feedbackForm.get('message').setValue('Please add a feature');
        repository.sendFeedback.mockReturnValue(throwError(() => new Error('boom')));
        const notifications: any[] = [];
        component.notification$.subscribe((n) => notifications.push(n));

        component.onSend();

        expect(notifications[0].text).toBe('Error!');
    });

    it('validates the email format when provided', () => {
        const email = component.feedbackForm.get('email');

        email.setValue('not-an-email');
        expect(email.hasError('pattern')).toBe(true);

        email.setValue('mail@example.com');
        expect(email.valid).toBe(true);
    });

    it('allows an empty email', () => {
        const email = component.feedbackForm.get('email');

        email.setValue('');
        expect(email.valid).toBe(true);
    });

    it('requires the message to be filled', () => {
        const message = component.feedbackForm.get('message');

        expect(message.hasError('required')).toBe(true);

        message.setValue('Please add a feature');
        expect(message.valid).toBe(true);
    });

    it('disables the submit button only while the form is invalid', () => {
        expect(component.disbaleSubmitButton).toBe(true);

        component.feedbackForm.get('message').setValue('Please add a feature');
        expect(component.disbaleSubmitButton).toBe(false);
    });
});
