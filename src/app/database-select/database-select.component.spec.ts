import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseSelectComponent } from './database-select.component';

describe('DatabaseSelectComponent', () => {
  let component: DatabaseSelectComponent;
  let fixture: ComponentFixture<DatabaseSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseSelectComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
