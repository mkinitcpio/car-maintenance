import { AutoCloseable } from './auto-closeable';

import { merge, Observable } from 'rxjs';
import { filter, first, pairwise, takeUntil } from 'rxjs/operators';
import {EntityState, Status} from "../state/interface";

export class SubscriptionListener extends AutoCloseable {
  public listenEntityValue$<T>(observable: Observable<T>, once = true): Observable<T> {
    let source;

    if (once) {
      source = observable.pipe<T, T>(
        filter<T>(Boolean),
        first(),
      );
    } else {
      source = observable.pipe<T, T>(
        takeUntil(this.destroyedSource),
        filter<T>(Boolean),
      );
    }

    return source;
  }

  public listenLoadedEntity$<T>(observable: Observable<EntityState<T>> | Observable<EntityState<T>>[]): Observable<[EntityState<T>, EntityState<T>]> {
    let source;

    if(observable instanceof Array) {
      source = merge(...observable)
        .pipe(
          takeUntil(this.destroyedSource),
          pairwise(),
          filter(([prev, curr]) => prev.status === Status.Loading && curr.status === Status.Success),
        );
    } else {
      source = observable.pipe(
        takeUntil(this.destroyedSource),
        pairwise(),
        filter(([prev, curr]) => prev.status === Status.Loading && curr.status === Status.Success),
      );
    }

    return source;
  }
}
