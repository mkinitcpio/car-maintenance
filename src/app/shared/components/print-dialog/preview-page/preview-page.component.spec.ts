import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NEVER, of } from 'rxjs';

import { PreviewPageComponent } from './preview-page.component';
import { ExportService } from '@shared/services/export.service';
import { PrintMarkupService } from '@shared/services/print-markup.service';

describe('PreviewPageComponent', () => {
  let component: PreviewPageComponent;
  let fixture: ComponentFixture<PreviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewPageComponent],
      providers: [
        { provide: PrintMarkupService, useValue: { build: vi.fn().mockName('build').mockReturnValue(of('<div></div>')) } },
        { provide: ExportService, useValue: { generatePDF: vi.fn().mockName('generatePDF').mockReturnValue(NEVER) } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(PreviewPageComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(PreviewPageComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('config', {
      showTablesCostResult: true,
      columns: [
        { id: 'name', visible: true } as any,
        { id: 'cost', visible: false } as any,
      ],
    });
    fixture.componentRef.setInput('data', {
      multiply: false,
      tablesData: [{ title: 'T', totalCost: 0, records: [{ cost: '10' }] as any }],
    } as any);
  });

  it('creates', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('clamps zoom between the configured limits', () => {
    for (let i = 0; i < 20; i += 1) {
      component.zoomIn();
    }
    expect(component.zoom()).toBe(2.5);

    for (let i = 0; i < 30; i += 1) {
      component.zoomOut();
    }
    expect(component.zoom()).toBe(0.5);
  });
});
