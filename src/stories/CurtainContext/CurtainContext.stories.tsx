import type { Meta, StoryObj } from '@storybook/react';

import { CurtainContextComponent } from '.';

const meta = {
    title: 'Example/Curtain/with context',
    component: CurtainContextComponent,
    tags: ['autodocs'],
} satisfies Meta<typeof CurtainContextComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
    },
};

