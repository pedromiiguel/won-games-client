import { Story, Meta } from '@storybook/react'
import GameInfo, { GameInfoProps } from '.'
import mockGame from './mock'

export default {
  title: 'Game/GameInfo',
  component: GameInfo,
  args: mockGame,
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
} as Meta

export const Default: Story<GameInfoProps> = (args) => (
  <div style={{ maxWidth: '144rem', margin: '0 auto' }}>
    <GameInfo {...args} />
  </div>
)
