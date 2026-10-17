import type { Preview } from '@storybook/angular';

import { ColorEnum } from '../src/app/shared/components/settings/colors-enum';

type Platform = 'linux' | 'windows' | 'darwin';

// Electron's systemPreferences.getAccentColor() is unavailable in the browser,
// so system accent colors are approximated per platform.
const defaultAccentColor: Record<Platform, string> = {
  linux: '#e95420',
  darwin: '#0078d4',
  windows: '#0078d4',
};

const applyAccentColor = (color: string, platform: Platform): void => {
  const base = (color === ColorEnum.Default ? defaultAccentColor[platform] : color).replace('#', '');

  document.documentElement.style.setProperty('--primary-color', `#${base}`);
  document.documentElement.style.setProperty('--secondary-color', `#${base}1f`);
};

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1e1e2e' },
      ],
    },
  },
  globalTypes: {
    platform: {
      description: 'Platform whose variables from src/styles/platform are applied',
      toolbar: {
        title: 'Platform',
        items: [
          { value: 'linux', title: 'Linux' },
          { value: 'windows', title: 'Windows' },
          { value: 'darwin', title: 'Darwin' },
        ],
        dynamicTitle: true,
      },
    },
    theme: {
      description: 'Color scheme (data-theme on <html>)',
      toolbar: {
        title: 'Theme',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
    color: {
      description: 'Accent color (primary/secondary CSS variables)',
      toolbar: {
        title: 'Accent',
        items: [
          { value: ColorEnum.Default, title: 'Default (system accent)' },
          { value: ColorEnum.VioletCrayola, title: 'Violet Crayola' },
          { value: ColorEnum.Blue, title: 'Blue' },
          { value: ColorEnum.Flame, title: 'Flame' },
          { value: ColorEnum.Green, title: 'Green' },
          { value: ColorEnum.PineGreen, title: 'Pine Green' },
          { value: ColorEnum.Manatee, title: 'Manatee' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    platform: 'linux',
    theme: 'light',
    color: ColorEnum.Default,
  },
  decorators: [
    (Story, context) => {
      const platform = context.globals.platform as Platform;
      const { theme, color } = context.globals;

      document.documentElement.setAttribute('data-platform', platform);
      document.documentElement.setAttribute('data-theme', theme);
      applyAccentColor(color, platform);

      return Story();
    },
  ],
};

export default preview;
