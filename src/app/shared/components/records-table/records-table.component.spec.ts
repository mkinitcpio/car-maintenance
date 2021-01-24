import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsTableComponent } from './records-table.component';

describe('RecordsTableComponent', () => {
  let component: RecordsTableComponent;
  let fixture: ComponentFixture<RecordsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
