import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelsDialogComponent } from './labels-dialog.component';
import { createMatDialogRefMock, provideDialog } from 'testing/component-setup';

describe('LabelsDialogComponent', () => {
  let component: LabelsDialogComponent;
  let fixture: ComponentFixture<LabelsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelsDialogComponent],
      providers: provideDialog(['Oil', 'Brakes'], createMatDialogRefMock()),
    })
      .overrideComponent(LabelsDialogComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(LabelsDialogComponent);
    component = fixture.componentInstance;
  });

  it('creates and exposes the injected labels', () => {
    expect(component).toBeTruthy();
    expect(component.labels).toEqual(['Oil', 'Brakes']);
  });
});
