import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { CreateDialogComponent } from './create-dialog.component';
import { FormModeEnum } from './form-mode.enum';
import { createMatDialogRefMock, provideDialog } from 'testing/component-setup';
import { provideMockSettingsService } from 'testing/test-mocks';

describe('CreateDialogComponent', () => {
  let component: CreateDialogComponent;
  let fixture: ComponentFixture<CreateDialogComponent>;
  let dialogRef: ReturnType<typeof createMatDialogRefMock>;

  beforeEach(async () => {
    dialogRef = createMatDialogRefMock();
    await TestBed.configureTestingModule({
      declarations: [CreateDialogComponent],
      imports: [TranslateModule.forRoot()],
      providers: [
        ...provideDialog({ parentId: 'p1', mode: FormModeEnum.Create }, dialogRef),
        provideMockSettingsService(),
      ],
    })
      .overrideComponent(CreateDialogComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(CreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('seeds the form with the parent id from the dialog data', () => {
    expect(component.categoryForm.get('parent').value).toBe('p1');
  });

  it('builds the icon assets path from the active icon pack', () => {
    expect(component.iconsPath).toContain('assets/category-icons/default/');
  });

  describe('onSubmit', () => {
    it('does not close while the form is invalid (name is required)', () => {
      component.onSubmit();
      expect(dialogRef.close).not.toHaveBeenCalled();
    });

    it('closes with the category once the form is valid', () => {
      component.categoryForm.get('name').setValue('Engine');

      component.onSubmit();

      expect(dialogRef.close).toHaveBeenCalledWith(component.categoryForm.value as any);
    });
  });

  it('composes a translated title', (done) => {
    component.title.subscribe((title) => {
      expect(title).toBe('DIALOG.ADD DIALOG.CATEGORY');
      done();
    });
  });
});
