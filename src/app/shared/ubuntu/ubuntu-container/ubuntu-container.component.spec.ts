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

  it('collapses the content on toggle', () => {
    const collapsible = fixture.nativeElement.querySelector('.ubuntu-container__collapsible');
    expect(collapsible.classList.contains('ubuntu-container__collapsible--collapsed')).toBe(false);

    component.toggle();
    fixture.detectChanges();

    expect(collapsible.classList.contains('ubuntu-container__collapsible--collapsed')).toBe(true);

    component.toggle();
    fixture.detectChanges();

    expect(collapsible.classList.contains('ubuntu-container__collapsible--collapsed')).toBe(false);
  });
});
