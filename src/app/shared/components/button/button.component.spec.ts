import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('adds the active modifier class when active is true', () => {
    component.active = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.button').classList).toContain('button--active');
  });

  it('omits the active modifier class when active is false', () => {
    component.active = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.button').classList).not.toContain('button--active');
  });
});
