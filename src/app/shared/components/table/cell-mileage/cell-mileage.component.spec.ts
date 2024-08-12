import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellMileageComponent } from './cell-mileage.component';

describe('CellMileageComponent', () => {
  let component: CellMileageComponent;
  let fixture: ComponentFixture<CellMileageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CellMileageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CellMileageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
