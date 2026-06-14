import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorSelectorComponent } from './color-selector.component';
import { ColorEnum } from '../settings/colors-enum';

describe('ColorSelectorComponent', () => {
  let component: ColorSelectorComponent;
  let fixture: ComponentFixture<ColorSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ declarations: [ColorSelectorComponent] })
      .overrideComponent(ColorSelectorComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(ColorSelectorComponent);
    component = fixture.componentInstance;
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('emits the picked color', () => {
    const spy = jasmine.createSpy('select');
    component.select.subscribe(spy);

    component.onSelected(ColorEnum.Blue);

    expect(spy).toHaveBeenCalledWith(ColorEnum.Blue);
  });

  it('maps the system-color toggle to Blue when enabled', () => {
    const spy = jasmine.createSpy('select');
    component.select.subscribe(spy);

    component.onSystemColorToggle(true);

    expect(spy).toHaveBeenCalledWith(ColorEnum.Blue);
  });

  it('maps the system-color toggle to the default color when disabled', () => {
    const spy = jasmine.createSpy('select');
    component.select.subscribe(spy);

    component.onSystemColorToggle(false);

    expect(spy).toHaveBeenCalledWith(ColorEnum.Default);
  });
});
