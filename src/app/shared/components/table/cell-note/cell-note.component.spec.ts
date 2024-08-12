import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellNoteComponent } from './cell-note.component';

describe('CellNoteComponent', () => {
  let component: CellNoteComponent;
  let fixture: ComponentFixture<CellNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CellNoteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CellNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
