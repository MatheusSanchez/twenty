import { expect, jest } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import { mainColorNames, ThemeColor } from '@/ui/theme/constants/colors';
import { CatalogDecorator } from '~/testing/decorators/CatalogDecorator';
import { ComponentDecorator } from '~/testing/decorators/ComponentDecorator';
import { CatalogStory } from '~/testing/types';

import { Status } from '../Status';

const meta: Meta<typeof Status> = {
  title: 'UI/Display/Status/Status',
  component: Status,
  args: {
    text: 'Urgent',
  },
};

export default meta;
type Story = StoryObj<typeof Status>;

export const Default: Story = {
  args: {
    color: 'red',
    onClick: jest.fn(),
  },
  decorators: [ComponentDecorator],
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const status = canvas.getByRole('heading', { level: 3 });

    await userEvent.click(status);
    expect(args.onClick).toHaveBeenCalled();
  },
};

export const WithLongText: Story = {
  decorators: [ComponentDecorator],
  args: {
    color: 'green',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
  parameters: {
    container: { width: 100 },
  },
};

export const Catalog: CatalogStory<Story, typeof Status> = {
  argTypes: {
    color: { control: false },
  },
  parameters: {
    catalog: {
      dimensions: [
        {
          name: 'colors',
          values: mainColorNames,
          props: (color: ThemeColor) => ({ color }),
        },
      ],
    },
  },
  decorators: [CatalogDecorator],
};
