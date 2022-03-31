import { Story, Meta } from '@storybook/react'
import CartIcon, { CartIconProps } from '.'

export default {
  title: 'CartIcon',
  component: CartIcon,
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
} as Meta

export const Default: Story = () => <CartIcon />

export const WithItems: Story<CartIconProps> = (args) => <CartIcon {...args} />

WithItems.args = {
  quantity: 5
}
