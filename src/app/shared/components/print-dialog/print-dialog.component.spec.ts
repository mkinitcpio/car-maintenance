import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { PrintDialogComponent } from './print-dialog.component';
import { ElectronService } from '@core/services';
import { ExportService } from '@shared/services/export.service';
import { createMatDialogRefMock, provideDialog } from 'testing/component-setup';
import { provideMockElectronService } from 'testing/test-mocks';

describe('PrintDialogComponent', () => {
  let component: PrintDialogComponent;
  let fixture: ComponentFixture<PrintDialogComponent>;
  let exportService: { toPDF: jasmine.Spy };
  const dialogRef = createMatDialogRefMock();

  const data = {
    multiply: false,
    tablesData: [
      { title: 'Engine', totalCost: 0, records: Array.from({ length: 6 }, (_, i) => ({ id: `r${i}` })) },
      { title: 'Empty', totalCost: 0, records: [] },
    ],
  };

  beforeEach(async () => {
    exportService = { toPDF: jasmine.createSpy('toPDF').and.returnValue(of({ status: 'Success', filePath: '/out.pdf' })) };

    await TestBed.configureTestingModule({
      declarations: [PrintDialogComponent],
      providers: [
        ...provideDialog(JSON.parse(JSON.stringify(data)), dialogRef),
        provideMockElectronService(),
        { provide: ExportService, useValue: exportService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(PrintDialogComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(PrintDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('defaults the save directory to the home directory', () => {
    const electron = TestBed.inject(ElectronService) as any;
    expect(component.saveDirectoryPath).toBe(electron.os.homedir());
  });

  it('drops empty tables and caps preview rows at five', () => {
    expect(component.data.tablesData.length).toBe(1);
    expect(component.data.tablesData[0].title).toBe('Engine');
    expect(component.data.tablesData[0].records.length).toBe(5);
  });

  it('sets up the preview columns and config', () => {
    expect(component.columns.length).toBeGreaterThan(0);
    expect(component.config.showTablesCostResult).toBe(true);
  });

  it('reorders columns on drop', () => {
    const first = component.columns[0];
    component.drop({ previousIndex: 0, currentIndex: 1 } as any);
    expect(component.columns[1]).toBe(first);
  });

  it('exports to PDF and closes with the result', () => {
    component.print = { nativeElement: { outerHTML: '<div></div>' } };

    component.onPrint();

    expect(exportService.toPDF).toHaveBeenCalled();
    expect(dialogRef.close).toHaveBeenCalledWith({ status: 'Success', filePath: '/out.pdf' } as any);
  });
});
