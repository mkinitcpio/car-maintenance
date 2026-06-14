import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ChangelogIllustrationComponent } from './changelog-illustration.component';

describe('ChangelogIllustrationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangelogIllustrationComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  it('creates', () => {
    const fixture = TestBed.createComponent(ChangelogIllustrationComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
