import { Story, Meta } from '@storybook/react'
import CartList from '.'
import items from './mock'

export default {
  title: 'CartList',
  component: CartList,
  argTypes: {
    cartContextValue: {
      type: 'function'
    },
    items: {
      type: 'function'
    }
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
} as Meta

export const Default: Story = (args) => (
  <div style={{ maxWidth: 800 }}>
    <CartList {...args} />
  </div>
)

Default.args = {
  total: '$ 330.00',
  cartContextValue: { items }
}

export const WithButton: Story = (args) => (
  <div style={{ maxWidth: 800 }}>
    <CartList {...args} hasButton />
  </div>
)

WithButton.args = {
  total: '$ 200.00',
  cartContextValue: { items }
}

export const Empty: Story = () => (
  <div style={{ maxWidth: 800 }}>
    <CartList />
  </div>
)
