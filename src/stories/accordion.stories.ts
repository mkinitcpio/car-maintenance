import { provideAppInitializer, inject } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { Accordion } from '../app/shared/components/accordion/accordion';

type AccordionWithArgs = Omit<Accordion, 'header' | 'expand' | 'variant' | 'icon' | 'opened'> & {
  header: string;
  expand: boolean;
  variant: 'default' | 'nested';
  icon: string;
  opened: (opened: boolean) => void;
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

const meta: Meta<AccordionWithArgs> = {
  title: 'Shared/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    header: { control: 'text' },
    expand: { control: 'boolean' },
    variant: { control: 'radio', options: ['default', 'nested'] },
    icon: { control: 'text' },
  },
  args: {
    header: 'Common',
    expand: false,
    variant: 'default',
    icon: '',
    opened: fn(),
  },
  render: ({ header, expand, variant, icon, opened }) => ({
    props: { header, expand, variant, icon, opened },
    template: `
      <cm-accordion
        [header]="header"
        [expand]="expand"
        [variant]="variant"
        [icon]="icon || null"
        (opened)="opened($event)">
        <div style="padding: 8px 0;">Accordion content</div>
      </cm-accordion>
    `,
    applicationConfig,
  }),
};

export default meta;
type Story = StoryObj<AccordionWithArgs>;

export const Collapsed: Story = {};

export const Expanded: Story = {
  args: { expand: true },
};

export const Nested: Story = {
  args: { expand: true, variant: 'nested' },
};

export const WithIcon: Story = {
  args: { expand: true, icon: 'settings' },
};
