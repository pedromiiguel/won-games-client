import { Story, Meta } from '@storybook/react'
import CartDropdown, { CardDropdownProps } from '.'
import items from 'components/CartList/mock'
export default {
  title: 'CartDropdown',
  component: CartDropdown,
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  },
  args: { items, total: '$30.00' }
} as Meta

export const Default: Story<CardDropdownProps> = (args) => (
  <div style={{ maxWidth: '98%', display: 'flex', justifyContent: 'flex-end' }}>
    <CartDropdown {...args} />
  </div>
)

export const Empty: Story<CardDropdownProps> = () => (
  <div style={{ maxWidth: '98%', display: 'flex', justifyContent: 'flex-end' }}>
    <CartDropdown />
  </div>
)
