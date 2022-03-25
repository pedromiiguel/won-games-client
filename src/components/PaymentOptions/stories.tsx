import { Story, Meta } from '@storybook/react'
import PaymentOptions, { PaymentOptionsProps } from '.'
import mockCard from './mock'

export default {
  title: 'PaymentOptions',
  component: PaymentOptions,
  args: { cards: mockCard },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  },
  argTypes: { handlePayment: { action: 'clicked' } }
} as Meta

export const Default: Story<PaymentOptionsProps> = (args) => (
  <div style={{ padding: 16, maxWidth: 400 }}>
    <PaymentOptions {...args} />
  </div>
)
