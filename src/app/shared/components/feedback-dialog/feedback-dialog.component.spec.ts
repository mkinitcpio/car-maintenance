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
  let repository: { sendFeedback: jasmine.Spy };

  beforeEach(async () => {
    repository = { sendFeedback: jasmine.createSpy('sendFeedback').and.returnValue(of(undefined)) };

    await TestBed.configureTestingModule({
      declarations: [FeedbackDialogComponent],
      imports: [ReactiveFormsModule],
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
    const notifications: any[] = [];
    component.notification$.subscribe((n) => notifications.push(n));

    component.onSend();

    expect(repository.sendFeedback).toHaveBeenCalledWith(component.feedbackForm.value as any);
    expect(notifications[0].text).toBe('Successfully sent!');
  });

  it('reports an error when sending fails', () => {
    repository.sendFeedback.and.returnValue(throwError(() => new Error('boom')));
    const notifications: any[] = [];
    component.notification$.subscribe((n) => notifications.push(n));

    component.onSend();

    expect(notifications[0].text).toBe('Error!');
  });

  it('disables the submit button only while the form is invalid', () => {
    expect(component.disbaleSubmitButton).toBe(false);
  });
});
