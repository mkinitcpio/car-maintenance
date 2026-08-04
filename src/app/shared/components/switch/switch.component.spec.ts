import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { SwitchComponent } from './switch.component';

describe('SwitchComponent', () => {
  let component: SwitchComponent;
  let fixture: ComponentFixture<SwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchComponent);
    component = fixture.componentInstance;
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('stops event propagation and emits the checkbox state', () => {
    const emitted: boolean[] = [];
    component.change.subscribe((value) => emitted.push(value));
    const event = { stopPropagation: jasmine.createSpy('stopPropagation'), target: { checked: true } };

    component.onChange(event);

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(emitted).toEqual([true]);
  });
});
