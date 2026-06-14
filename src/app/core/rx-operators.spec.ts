import { of } from 'rxjs';
import { toArray } from 'rxjs/operators';

import { stateValue } from './rx-operators';

describe('stateValue operator', () => {
  it('maps an entity-state stream down to its value', (done) => {
    const source = of(
      { status: 'Loading', value: null, error: null },
      { status: 'Success', value: [1, 2, 3], error: null },
    );

    stateValue<number[]>(source as any)
      .pipe(toArray())
      .subscribe((values) => {
        expect(values).toEqual([null, [1, 2, 3]]);
        done();
      });
  });
});
