import { SideNavigationTrackerService } from './side-navigation-tracker.service';

describe('SideNavigationTrackerService', () => {
  let service: SideNavigationTrackerService;

  beforeEach(() => {
    service = new SideNavigationTrackerService();
  });

  it('relays collapse values to subscribers', () => {
    const received: boolean[] = [];
    service.collapse$.subscribe((value) => received.push(value));

    service.collapse$.next(true);
    service.collapse$.next(false);

    expect(received).toEqual([true, false]);
  });

  it('does not replay values to late subscribers (plain Subject)', () => {
    service.collapse$.next(true);

    let received: boolean | undefined;
    service.collapse$.subscribe((value) => (received = value));

    expect(received).toBeUndefined();
  });
});
