import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { CmButton } from '../app/shared/components/button/button';

type ButtonWithArgs = CmButton & {
  label: string;
  onClick: (event: unknown) => void;
};

const meta: Meta<ButtonWithArgs> = {
  title: 'Components',
  component: CmButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'transparent', 'neutral', 'dangerous'],
    },
    shape: {
      control: { type: 'radio' },
      options: ['default', 'rounded'],
    },
    size: {
      control: { type: 'radio' },
      options: ['default', 'small'],
    },
    active: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    variant: 'primary',
    shape: 'default',
    size: 'default',
    active: false,
    label: 'Button',
  },
  render: (args) => ({
    props: args,
    template: `<button cm-button [variant]="variant" [shape]="shape" [size]="size" [active]="active">{{ label }}</button>`,
  }),
};

export default meta;
type Story = StoryObj<ButtonWithArgs>;

export const Button: Story = {};

