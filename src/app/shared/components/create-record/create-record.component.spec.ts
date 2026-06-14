import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { CreateRecordComponent } from './create-record.component';
import { FormModeEnum } from '../create-dialog/form-mode.enum';
import { DataBaseService } from '@core/database';
import { createMatDialogRefMock, provideDialog } from 'testing/component-setup';
import { createDataBaseServiceMock, provideMockSettingsService } from 'testing/test-mocks';

describe('CreateRecordComponent', () => {
  let component: CreateRecordComponent;
  let fixture: ComponentFixture<CreateRecordComponent>;
  let dialogRef: ReturnType<typeof createMatDialogRefMock>;
  const database = createDataBaseServiceMock();

  beforeEach(async () => {
    dialogRef = createMatDialogRefMock();
    database.getLabels.and.returnValue(['Oil', 'Air', 'Brake']);

    await TestBed.configureTestingModule({
      declarations: [CreateRecordComponent],
      imports: [ReactiveFormsModule, TranslateModule.forRoot()],
      providers: [
        ...provideDialog({ mode: FormModeEnum.Create, parent: 'p1' }, dialogRef),
        provideMockSettingsService(),
        { provide: DataBaseService, useValue: database },
      ],
    })
      .overrideComponent(CreateRecordComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(CreateRecordComponent);
    component = fixture.componentInstance;
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('initialises the form with a generated id and the parent from the dialog data', () => {
    expect(component.recordForm.get('id').value).toBeTruthy();
    expect(component.recordForm.get('parent').value).toBe('p1');
  });

  describe('onSubmit', () => {
    it('does not close while invalid (name required)', () => {
      component.onSubmit();
      expect(dialogRef.close).not.toHaveBeenCalled();
    });

    it('closes with the record once valid', () => {
      component.recordForm.get('name').setValue('Oil change');
      component.onSubmit();
      expect(dialogRef.close).toHaveBeenCalledWith(component.recordForm.value as any);
    });
  });

  describe('labels', () => {
    it('adds a trimmed label from a chip input and resets the input', () => {
      const chipInput = { clear: jasmine.createSpy('clear') };
      component.addLabel({ value: '  Coolant  ', chipInput } as any);

      expect(component.recordForm.get('labels').value).toEqual(['Coolant']);
      expect(chipInput.clear).toHaveBeenCalled();
    });

    it('ignores an empty chip input value', () => {
      component.addLabel({ value: '   ', chipInput: { clear: () => {} } } as any);
      expect(component.recordForm.get('labels').value).toEqual([]);
    });

    it('removes a label by index', () => {
      component.recordForm.get('labels').patchValue(['Oil', 'Air']);
      component.removeLabel(0);
      expect(component.recordForm.get('labels').value).toEqual(['Air']);
    });

    it('adds a label selected from the autocomplete', () => {
      const event = { option: { viewValue: 'Brake', deselect: jasmine.createSpy('deselect') } };
      component.selectLabel(event as any);

      expect(component.recordForm.get('labels').value).toEqual(['Brake']);
      expect(event.option.deselect).toHaveBeenCalled();
    });

    it('filters the known labels by the current input', () => {
      component.currentLabel.set('a');
      expect(component.filteredLabels()).toEqual(['Air', 'Brake']);

      component.currentLabel.set('oil');
      expect(component.filteredLabels()).toEqual(['Oil']);
    });
  });
});
