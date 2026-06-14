import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { DocumentationIllustrationComponent } from './documentation-illustration.component';

describe('DocumentationIllustrationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationIllustrationComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  it('creates', () => {
    const fixture = TestBed.createComponent(DocumentationIllustrationComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
