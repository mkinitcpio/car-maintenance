import { Directive, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Directive()
export abstract class AutoCloseable implements OnDestroy {

  protected destroyedSource: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  public ngOnDestroy(): void {
    this.destroyedSource.next(true);
    this.destroyedSource.complete();
  }
}