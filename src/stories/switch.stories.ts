import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { SwitchComponent } from '../app/shared/components/switch/switch.component';

const meta: Meta<SwitchComponent> = {
  title: 'Shared/Switch',
  component: SwitchComponent,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'boolean' },
  },
  args: {
    value: false,
    change: fn(),
  },
  render: (args) => ({
    props: args,
    template: `<cm-switch [value]="value" (change)="change($event)"></cm-switch>`,
  }),
};

export default meta;
type Story = StoryObj<SwitchComponent>;

export const Off: Story = {};

export const On: Story = {
  args: { value: true },
};
