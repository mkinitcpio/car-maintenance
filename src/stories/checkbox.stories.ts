import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { CmCheckbox } from '../app/shared/components/checkbox/checkbox';

type CheckboxWithArgs = CmCheckbox & { label: string };

const meta: Meta<CheckboxWithArgs> = {
  title: 'Shared/Checkbox',
  component: CmCheckbox,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'boolean' },
    intermideate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    value: false,
    intermideate: false,
    disabled: false,
    label: 'Checkbox',
    change: fn(),
  },
  render: ({ label, ...props }) => ({
    props,
    template: `<cm-checkbox [value]="value" [intermideate]="intermideate" [disabled]="disabled" (change)="change($event)">{{ label }}</cm-checkbox>`,
  }),
};

export default meta;
type Story = StoryObj<CheckboxWithArgs>;

export const Unchecked: Story = {};

export const Checked: Story = {
  args: { value: true },
};

export const Disabled: Story = {
  args: { value: true, disabled: true },
};
