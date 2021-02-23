import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbuntuCloseButtonComponent } from './ubuntu-close-button.component';

describe('UbuntuCloseButtonComponent', () => {
  let component: UbuntuCloseButtonComponent;
  let fixture: ComponentFixture<UbuntuCloseButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UbuntuCloseButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UbuntuCloseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
