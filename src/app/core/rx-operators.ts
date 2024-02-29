import { map } from 'rxjs/operators';
import { EntityState } from './state/core/state.interfaces';
import { Observable } from 'rxjs';

export function stateValue<T>(source: Observable<EntityState<T>>) {
  return source.pipe(
    map(entityState => entityState.value),
  );
}