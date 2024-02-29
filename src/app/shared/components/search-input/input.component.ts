import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements AfterViewInit {

  @ViewChild('input', { static: true })
  input: ElementRef<HTMLInputElement>;

  @Output()
  onChange: EventEmitter<string> = new EventEmitter();

  public focused = false;

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
      ).subscribe(() => {
        this.onChange.emit(this.input.nativeElement.value);
      });
  }

  public onClick(element: HTMLInputElement): void {
    element.focus();
  }

  onFocus(isFocus: boolean): void {
    this.focused = isFocus;
  }
}
