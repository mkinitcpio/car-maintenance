import { GroupTreeService, GroupData } from './group-tree.service';

describe('GroupTreeService', () => {
    let service: GroupTreeService;

    beforeEach(() => {
        service = new GroupTreeService();
    });

    const groupData: GroupData = { routeName: 'details', group: { id: 'g1', name: 'Engine' } };

    it('starts with no selected item and emits null', async () => {
        expect(service.getSelectedItem()).toBeNull();
        service.selected$.subscribe((value) => {
            expect(value).toBeNull();
            ;
        });
    });

    it('stores the selected item and exposes it via getSelectedItem', () => {
        service.selectedItem(groupData);
        expect(service.getSelectedItem()).toBe(groupData);
    });

    it('emits the selected item through selected$', async () => {
        const emissions: GroupData[] = [];
        service.selected$.subscribe((value) => emissions.push(value));

        service.selectedItem(groupData);

        // BehaviorSubject replays the initial null, then the new value.
        expect(emissions).toEqual([null, groupData]);
        ;
    });

    describe('expand state', () => {
        it('is undefined for an unknown id', () => {
            expect(service.getGroupExpandState('missing')).toBeUndefined();
        });

        it('toggles between true and false on each switch', () => {
            service.switchExpandState('g1');
            expect(service.getGroupExpandState('g1')).toBe(true);

            service.switchExpandState('g1');
            expect(service.getGroupExpandState('g1')).toBe(false);

            service.switchExpandState('g1');
            expect(service.getGroupExpandState('g1')).toBe(true);
        });

        it('tracks expand state per id independently', () => {
            service.switchExpandState('a');
            expect(service.getGroupExpandState('a')).toBe(true);
            expect(service.getGroupExpandState('b')).toBeUndefined();
        });
    });

    describe('search mode', () => {
        it('expands every group while searching', () => {
            service.switchExpandState('a');

            service.setSearchActive(true);

            expect(service.getGroupExpandState('a')).toBe(true);
            expect(service.getGroupExpandState('b')).toBe(true);
        });

        it('restores the previous expand state when the search is over', () => {
            service.switchExpandState('a');

            service.setSearchActive(true);
            service.setSearchActive(false);

            expect(service.getGroupExpandState('a')).toBe(true);
            expect(service.getGroupExpandState('b')).toBeUndefined();
        });

        it('does not change the stored expand state while searching', () => {
            service.setSearchActive(true);

            service.switchExpandState('a');

            service.setSearchActive(false);
            expect(service.getGroupExpandState('a')).toBeUndefined();
        });
    });
});
