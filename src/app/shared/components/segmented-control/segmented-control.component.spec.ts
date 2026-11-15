import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { SegmentedControlComponent, SegmentedControlOption } from './segmented-control.component';

describe('SegmentedControlComponent', () => {
  let component: SegmentedControlComponent;
  let fixture: ComponentFixture<SegmentedControlComponent>;

  const options: SegmentedControlOption[] = [
    { value: 'Mi', label: 'METRIC_SYSTEM.MILES' },
    { value: 'Km', label: 'METRIC_SYSTEM.KILOMETERS' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegmentedControlComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent<SegmentedControlComponent<string>>(SegmentedControlComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', options);
    fixture.componentRef.setInput('value', 'Mi');
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('renders an option for every input', () => {
    const buttons = fixture.nativeElement.querySelectorAll('.segmented-control__option');

    expect(buttons.length).toBe(options.length);
  });

  it('marks the current value as selected', () => {
    const selected = fixture.nativeElement.querySelectorAll('.segmented-control__option--selected');

    expect(selected.length).toBe(1);
    expect(selected[0].textContent.trim()).toBe(options[0].label);
  });

  it('emits the value of the clicked option', () => {
    const emitted: string[] = [];
    component.valueChange.subscribe((value) => emitted.push(value));

    component.onSelect('Km');

    expect(emitted).toEqual(['Km']);
  });

  it('does not emit when the selected option is clicked again', () => {
    const emitted: string[] = [];
    component.valueChange.subscribe((value) => emitted.push(value));

    component.onSelect('Mi');

    expect(emitted).toEqual([]);
  });
});
