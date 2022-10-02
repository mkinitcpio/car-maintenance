import { Observable } from "rxjs";
import { takeUntil, pairwise, filter, map } from "rxjs/operators";
import { EntityState, Status } from "../state/interface";
import { AutoCloseable } from "./auto-closeable";

interface Config {
  value: boolean;
}

function listenLoadedEntity$<T, AutoClosableComponent extends AutoCloseable>(observable: Observable<EntityState<T>>, config: Config, component: AutoClosableComponent): Observable<[EntityState<T>, EntityState<T>]> | Observable<T> {

  let source: Observable<[EntityState<T>, EntityState<T>]> | Observable<T> = observable
    .pipe(
      takeUntil(component.destroyedSource),
      pairwise(),
      filter(([prev, curr]) => prev.status === Status.Loading && curr.status === Status.Success),
    );

  if(config && config.value) {
    source = source.pipe(
      map(([_, curr]) => curr.value)
    );
  }

  return source;
}

export function listen<T>(config?: Config) {
  return function (target: any, key: string): void {
    Object.defineProperty(target, key, {
      set(value: Observable<EntityState<T>>) {
        const source = listenLoadedEntity$<T, AutoCloseable>(value, config, this as AutoCloseable);
        target[`_${key}`] = source;
      },
      get() {
        return target[`_${key}`];
      }
    });
  };
}
