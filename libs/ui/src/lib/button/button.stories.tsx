import {Story, Meta} from '@storybook/react'
import {Button, IButton} from './button'

export default {
  component: Button,
  title: 'Button',
} as Meta

const Template: Story<IButton> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: 'X',
  onClick: console.log,
}
