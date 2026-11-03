import { provideAppInitializer, inject } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import type { Meta, StoryObj } from '@storybook/angular';

import { CmBadge } from '../app/shared/components/badge/badge';

type BadgeWithArgs = Omit<CmBadge, 'variant' | 'icon'> & {
  variant: 'primary' | 'neutral' | 'dangerous';
  icon: string;
  label: string;
};

const applicationConfig = {
  providers: [
    provideHttpClient(),
    provideAppInitializer(() => {
      const registry = inject(MatIconRegistry);
      const sanitizer = inject(DomSanitizer);
      registry.addSvgIconSet(sanitizer.bypassSecurityTrustResourceUrl('sprites/vuesax.svg'));
    }),
  ],
};

const meta: Meta<BadgeWithArgs> = {
  title: 'Shared/Badge',
  component: CmBadge,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    variant: { control: 'radio', options: ['primary', 'neutral', 'dangerous'] },
    icon: { control: 'text' },
  },
  args: {
    label: 'Badge',
    variant: 'primary',
    icon: '',
  },
  render: ({ variant, icon, label }) => ({
    props: { variant, icon, label },
    template: `
      <cm-badge [variant]="variant" [icon]="icon || null">{{ label }}</cm-badge>
    `,
    applicationConfig,
  }),
};

export default meta;
type Story = StoryObj<BadgeWithArgs>;

export const Primary: Story = {};

export const Neutral: Story = {
  args: { variant: 'neutral' },
};

export const Dangerous: Story = {
  args: { variant: 'dangerous' },
};

export const WithIcon: Story = {
  args: { icon: 'success', label: 'Completed' },
};
