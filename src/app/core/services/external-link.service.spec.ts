import { TestBed } from '@angular/core/testing';

import { ElectronService } from './electron/electron.service';
import { ExternalLinkService } from './external-link.service';
import { provideMockElectronService } from 'testing/test-mocks';

describe('ExternalLinkService', () => {
  let service: ExternalLinkService;
  let electron: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockElectronService()],
    });

    service = TestBed.inject(ExternalLinkService);
    electron = TestBed.inject(ElectronService);
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('opens https links', () => {
    expect(service.open('https://example.com/page')).toBe(true);
    expect(electron.shell.openExternal).toHaveBeenCalledWith('https://example.com/page');
  });

  it('opens mailto links', () => {
    expect(service.open('mailto:user@example.com?subject=Question')).toBe(true);
    expect(electron.shell.openExternal).toHaveBeenCalledWith('mailto:user@example.com?subject=Question');
  });

  it.each([
    'http://example.com',
    'file:///etc/passwd',
    'javascript:alert(1)',
    'example.com',
    '',
    null,
    undefined,
  ])('refuses to open %s', (url) => {
    expect(service.open(url)).toBe(false);
    expect(electron.shell.openExternal).not.toHaveBeenCalled();
  });
});
