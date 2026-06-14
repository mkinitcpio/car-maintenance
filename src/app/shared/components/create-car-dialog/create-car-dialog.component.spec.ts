import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { CreateCarDialogComponent } from './create-car-dialog.component';
import { FormModeEnum } from '../create-dialog/form-mode.enum';
import { createMatDialogRefMock, provideDialog } from 'testing/component-setup';
import { provideMockSettingsService } from 'testing/test-mocks';

describe('CreateCarDialogComponent', () => {
  let component: CreateCarDialogComponent;
  let fixture: ComponentFixture<CreateCarDialogComponent>;
  let dialogRef: ReturnType<typeof createMatDialogRefMock>;

  beforeEach(async () => {
    dialogRef = createMatDialogRefMock();

    await TestBed.configureTestingModule({
      declarations: [CreateCarDialogComponent],
      imports: [ReactiveFormsModule, TranslateModule.forRoot()],
      providers: [...provideDialog({ mode: FormModeEnum.Create }, dialogRef), provideMockSettingsService()],
    })
      .overrideComponent(CreateCarDialogComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(CreateCarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('does not close while the required name is empty', () => {
      component.onSubmit();
      expect(dialogRef.close).not.toHaveBeenCalled();
    });

    it('closes with the car once valid', () => {
      component.carForm.get('name').setValue('My Car');
      component.onSubmit();
      expect(dialogRef.close).toHaveBeenCalledWith(component.carForm.value as any);
    });
  });

  describe('parts', () => {
    it('adds and removes part controls', () => {
      expect(component.parts.length).toBe(0);

      component.addPart();
      component.addPart();
      expect(component.parts.length).toBe(2);

      component.onDeletePart(0);
      expect(component.parts.length).toBe(1);
    });
  });

  it('composes a translated title', (done) => {
    component.title.subscribe((title) => {
      expect(title).toBe('DIALOG.ADD DIALOG.CAR');
      done();
    });
  });
});
