import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { SourceCodeIllustrationComponent } from './source-code-illustration.component';

describe('SourceCodeIllustrationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SourceCodeIllustrationComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  it('creates', () => {
    const fixture = TestBed.createComponent(SourceCodeIllustrationComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
