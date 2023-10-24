import type { Meta, StoryObj } from '@storybook/react';

import Curtain from './Curtain';

const meta = {
    title: 'Example/Curtain',
    component: Curtain,
    tags: ['autodocs'],
} satisfies Meta<typeof Curtain>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        visible: false,
        curtainClassName: 'bg-dark',
        children: 'Curtain',
    },
};

export const WithCurtainChildren: Story = {
    args: {
        visible: false,
        curtainClassName: 'bg-dark text-white',
        curtainChildren: 'This is on the curtain',
        children: 'Curtain',
    },
};
