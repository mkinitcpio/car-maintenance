import type { Mock } from "vitest";
import { ResizeObserverService } from './resize-observer.service';

type ResizeCb = (entries: Array<{
    contentRect: {
        width: number;
    };
}>) => void;

describe('ResizeObserverService', () => {
    let service: ResizeObserverService;
    let originalResizeObserver: any;
    let capturedCallback: ResizeCb;
    let observeSpy: Mock;
    let unobserveSpy: Mock;

    beforeEach(() => {
        observeSpy = vi.fn().mockName('observe');
        unobserveSpy = vi.fn().mockName('unobserve');

        originalResizeObserver = (window as any).ResizeObserver;
        (window as any).ResizeObserver = class {
            constructor(cb: ResizeCb) {
                capturedCallback = cb;
            }
            observe = observeSpy;
            unobserve = unobserveSpy;
            disconnect = vi.fn().mockName('disconnect');
        };

        service = new ResizeObserverService();
    });

    afterEach(() => {
        (window as any).ResizeObserver = originalResizeObserver;
    });

    const element = document.createElement('div');
    const breakpoints: Array<[
        number,
        string
    ]> = [
        [600, 'small'],
        [1200, 'large'],
    ];

    it('throws when fewer than two breakpoints are supplied', () => {
        expect(() => service.observe(element, [[600, 'small']])).toThrowError('Breakpoints should have min 2 values.');
    });

    it('starts observing the element', () => {
        service.observe(element, breakpoints);
        expect(observeSpy).toHaveBeenCalledWith(element);
    });

    it('emits the breakpoint name for the current width', () => {
        const observer = service.observe(element, breakpoints);
        const seen: string[] = [];
        observer.subscribe((name) => seen.push(name));

        capturedCallback([{ contentRect: { width: 500 } }]);
        capturedCallback([{ contentRect: { width: 900 } }]);

        expect(seen).toEqual(['small', 'large']);
    });

    it('does not re-emit while the breakpoint is unchanged', () => {
        const observer = service.observe(element, breakpoints);
        const seen: string[] = [];
        observer.subscribe((name) => seen.push(name));

        capturedCallback([{ contentRect: { width: 500 } }]);
        capturedCallback([{ contentRect: { width: 550 } }]);

        expect(seen).toEqual(['small']);
    });

    it('throws when the width matches no breakpoint', () => {
        service.observe(element, breakpoints);

        expect(() => capturedCallback([{ contentRect: { width: 5000 } }])).toThrowError('Breakpoint name not found.');
    });
});
