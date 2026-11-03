import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/stories/**/*.stories.ts'],
  staticDirs: ['../src/assets'],
  addons: [],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
};

export default config;
