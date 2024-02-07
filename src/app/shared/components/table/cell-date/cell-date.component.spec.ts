import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellDateComponent } from './cell-date.component';

describe('CellDateComponent', () => {
  let component: CellDateComponent;
  let fixture: ComponentFixture<CellDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CellDateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CellDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
