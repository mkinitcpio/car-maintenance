import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbuntuContainerComponent } from './ubuntu-container.component';

describe('UbuntuContainerComponent', () => {
  let component: UbuntuContainerComponent;
  let fixture: ComponentFixture<UbuntuContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UbuntuContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UbuntuContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
