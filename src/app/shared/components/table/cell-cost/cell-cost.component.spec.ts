import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellCostComponent } from './cell-cost.component';

describe('CellCostComponent', () => {
  let component: CellCostComponent;
  let fixture: ComponentFixture<CellCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CellCostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CellCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
