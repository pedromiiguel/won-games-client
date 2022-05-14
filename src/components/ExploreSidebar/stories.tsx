import { Story, Meta } from '@storybook/react'
import ExploreSidebar, { ExploreSidebarProps } from '.'

import items from './mock'

export default {
  title: 'ExploreSidebar',
  component: ExploreSidebar,
  args: { items, onFilter: () => console.log('filter') },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
} as Meta

export const Default: Story<ExploreSidebarProps> = (args) => (
  <div style={{ padding: 16, maxWidth: 320 }}>
    <ExploreSidebar {...args} />
  </div>
)

export const WithInitialValue: Story<ExploreSidebarProps> = (args) => (
  <ExploreSidebar
    {...args}
    initialValues={{
      platforms: ['windows', 'linux'],
      sort_by: 'low-to-high'
    }}
  />
)
