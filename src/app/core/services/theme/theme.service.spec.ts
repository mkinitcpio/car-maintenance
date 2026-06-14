import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let root: HTMLElement;

  beforeEach(() => {
    root = document.documentElement;
    root.removeAttribute('data-platform');
    root.removeAttribute('data-theme');
    root.style.removeProperty('--primary-color');
    root.style.removeProperty('--secondary-color');
  });

  it('writes the platform onto the document element', () => {
    new ThemeService('linux');
    expect(root.getAttribute('data-platform')).toBe('linux');
  });

  describe('setColorScheme', () => {
    it('sets data-theme to the explicit light scheme', () => {
      new ThemeService('windows').setColorScheme('light');
      expect(root.getAttribute('data-theme')).toBe('light');
    });

    it('sets data-theme to the explicit dark scheme', () => {
      new ThemeService('windows').setColorScheme('dark');
      expect(root.getAttribute('data-theme')).toBe('dark');
    });

    it('resolves "auto" to light or dark', () => {
      new ThemeService('darwin').setColorScheme('auto');
      expect(['light', 'dark']).toContain(root.getAttribute('data-theme'));
    });
  });

  describe('setAppColors', () => {
    it('derives the primary and (translucent) secondary CSS variables', () => {
      new ThemeService('linux').setAppColors('#aabbcc');

      expect(root.style.getPropertyValue('--primary-color')).toBe('#aabbcc');
      expect(root.style.getPropertyValue('--secondary-color')).toBe('#aabbcc1f');
    });

    it('tolerates a base color without the leading hash', () => {
      new ThemeService('linux').setAppColors('112233');

      expect(root.style.getPropertyValue('--primary-color')).toBe('#112233');
    });
  });

  describe('getAvailableSchemas', () => {
    it('returns all three schemas by default', () => {
      const schemas = new ThemeService('linux').getAvailableSchemas();
      expect(schemas.map((s) => s.type)).toEqual(['light', 'dark', 'auto']);
    });

    it('filters to the schemas allowed for the platform', () => {
      const schemas = new ThemeService('linux', ['light', 'dark']).getAvailableSchemas();
      expect(schemas.map((s) => s.type)).toEqual(['light', 'dark']);
    });
  });
});
