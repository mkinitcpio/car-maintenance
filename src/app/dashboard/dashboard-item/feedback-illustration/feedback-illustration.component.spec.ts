import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { FeedbackIllustrationComponent } from './feedback-illustration.component';

describe('FeedbackIllustrationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedbackIllustrationComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  it('creates', () => {
    const fixture = TestBed.createComponent(FeedbackIllustrationComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
