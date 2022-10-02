import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

type ResizeBreakpointStateTuple = [size: number, name: string];

@Injectable({
  providedIn: 'any',
})
export class ResizeObserverService implements OnDestroy {

  private readonly MIN_BREAKPOINT: ResizeBreakpointStateTuple = [0, 'none'];
  private readonly MIN_BREAKPOINT_COUNT: number = 2;

  private $observer: Subject<string> = new Subject();
  private resizeObserver: ResizeObserver;
  private elementRef: HTMLElement;
  private previousBreakpoint: string;
  private breakpoints: ResizeBreakpointStateTuple[];

  public observe(element: HTMLElement, breakpoints: ResizeBreakpointStateTuple[]): Subject<string> {
    if(breakpoints.length < this.MIN_BREAKPOINT_COUNT) {
      throw new Error("Breakpoints should have min 2 values.");
    }

    this.elementRef = element;
    this.breakpoints = [
      this.MIN_BREAKPOINT,
      ...breakpoints.sort(([prev], [curr]) => prev - curr)
    ];

    this.resizeObserver = new ResizeObserver(this.checkChanges.bind(this) as ResizeObserverCallback);
    this.resizeObserver.observe(this.elementRef);

    return this.$observer;
  }

  private checkChanges([container]: ResizeObserverEntry[]): void {
    const NOT_FOUND_BREAKPOINT_NAME = null;
    const currentWidth = container.contentRect.width;
    const breakpointName = this.findCurrentBreakpointName(currentWidth, this.breakpoints);
    const notFoundBreakpointName = breakpointName === NOT_FOUND_BREAKPOINT_NAME;

    if(notFoundBreakpointName) {
      throw new Error("Breakpoint name not found.");
    }

    if(this.previousBreakpoint !== breakpointName) {
      this.previousBreakpoint = breakpointName;
      this.$observer.next(this.previousBreakpoint);
    }
  }

  private findCurrentBreakpointName(currentWidth: number, breakpoints: ResizeBreakpointStateTuple[]): string {
    const between = (min: number, max: number, value: number) => value > min && value <= max;
    let result = null;

    for(let i = 0; i < breakpoints.length - 1; i++) {
      const [min] = breakpoints[i];
      const [max, name] = breakpoints[i + 1];

      if(between(min, max, currentWidth)) {
        result = name;
        break;
      }
    }

    return result;
  }

  ngOnDestroy(): void {
    this.resizeObserver.unobserve(this.elementRef);
    this.$observer.complete();
  }
}
