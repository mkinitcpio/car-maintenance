import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { UbuntuContainerComponent } from './ubuntu-container.component';

describe('UbuntuContainerComponent', () => {
  let component: UbuntuContainerComponent;
  let fixture: ComponentFixture<UbuntuContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UbuntuContainerComponent, TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(UbuntuContainerComponent);
    component = fixture.componentInstance;
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('defaults hasBordersStyle to true', () => {
    expect(component.hasBordersStyle()).toBe(true);
  });
});
