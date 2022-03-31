import { Story, Meta } from '@storybook/react'
import Menu, { MenuProps } from '.'

export default {
  title: 'Menu',
  component: Menu
} as Meta

export const Default: Story<MenuProps> = (args) => <Menu {...args} />
export const Logged: Story<MenuProps> = (args) => <Menu {...args} />

Default.parameters = {
  layout: 'fullscreen',
  backgrounds: {
    default: 'dark'
  }
}

Logged.parameters = {
  layout: 'fullscreen',
  backgrounds: {
    default: 'dark'
  }
}

Logged.args = {
  username: 'John Doe'
}
