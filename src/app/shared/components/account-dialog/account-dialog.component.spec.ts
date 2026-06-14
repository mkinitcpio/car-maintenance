import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { AccountDialogComponent } from './account-dialog.component';
import { createMatDialogRefMock, provideDialog } from 'testing/component-setup';

describe('AccountDialogComponent', () => {
  let component: AccountDialogComponent;
  let fixture: ComponentFixture<AccountDialogComponent>;
  const dialogRef = createMatDialogRefMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountDialogComponent],
      imports: [TranslateModule.forRoot()],
      providers: provideDialog({}, dialogRef),
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('closes the dialog on close', () => {
    component.onClose();
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
