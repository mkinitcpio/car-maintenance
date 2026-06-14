import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';

import { DeleteDialogComponent } from './delete-dialog.component';
import { createMatDialogRefMock, provideDialog } from 'testing/component-setup';

describe('DeleteDialogComponent', () => {
  let component: DeleteDialogComponent;
  let fixture: ComponentFixture<DeleteDialogComponent>;
  const dialogRef = createMatDialogRefMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteDialogComponent],
      imports: [TranslateModule.forRoot()],
      providers: provideDialog({ text: 'DIALOG.DELETE.TEXT', params: { name: 'Oil' } }, dialogRef),
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('closes with true when confirmed', () => {
    component.onSubmit();
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('closes with false when cancelled', () => {
    component.onClose();
    expect(dialogRef.close).toHaveBeenCalledWith(false);
  });

  it('uses the injected MatDialogRef instance', () => {
    expect(TestBed.inject(MatDialogRef)).toBe(dialogRef as any);
  });
});
