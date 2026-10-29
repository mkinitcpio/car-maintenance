import type { Meta, StoryObj } from '@storybook/angular';

import { EmptyStateComponent, EmptyStateSize } from '../app/shared/components/empty-state/empty-state.component';

type EmptyStateWithArgs = EmptyStateComponent & {
  text: string;
  size: EmptyStateSize;
};

const meta: Meta<EmptyStateWithArgs> = {
  title: 'Components',
  component: EmptyStateComponent,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    size: {
      control: { type: 'radio' },
      options: ['s', 'm', 'l'],
    },
  },
  args: {
    text: 'No Records',
    size: 'm',
  },
  render: (args) => ({
    props: args,
    template: `<cm-empty-state [text]="text" [size]="size"></cm-empty-state>`,
  }),
};

export default meta;
type Story = StoryObj<EmptyStateWithArgs>;

export const EmptyState: Story = {};
