import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../atoms/button.tsx';

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    layout: 'centered',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const NewPrimary: Story = {
  args: {
    children: 'NewPrimary',
    size: 'm',
    variant: 'newPrimary',
  },
};

export const NewSecondary: Story = {
  args: {
    children: 'NewSecondary',
    size: 'l',
    variant: 'newSecondary',
  },
};

export const Glowing: Story = {
  args: {
    children: 'Glowing',
    glowing: true,
    size: 'l',
    variant: 'newPrimary',
  },
};

export const Rounded: Story = {
  args: {
    children: 'Rounded',
    rounded: true,
    size: 'l',
    variant: 'newPrimary',
  },
};

export const FakeDisabled: Story = {
  args: {
    children: 'FakeDisabled',
    fakeDisabled: true,
    size: 'l',
    variant: 'newPrimary',
  },
};

export const OnHoverArrow: Story = {
  args: {
    children: 'OnHoverArrow',
    onHoverArrow: true,
    size: 'l',
    variant: 'newPrimary',
  },
};
