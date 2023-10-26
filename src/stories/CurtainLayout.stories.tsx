import type { Meta, StoryObj } from '@storybook/react';

import { Layout } from './CurtainLayout';

const meta = {
    title: 'Example/Curtain/in layout',
    component: Layout,
    tags: ['autodocs'],
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Fixed: Story = {
    args: {
        curtainClassName: 'bg-dark',
        position: 'fixed',
    },
};

export const Absolute: Story = {
    args: {
        curtainClassName: 'bg-dark',
        position: 'absolute',
    },
};
