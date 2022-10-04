import {Story, Meta} from '@storybook/react'
import {Input, IInput} from './input'

export default {
  component: Input,
  title: 'Input',
} as Meta

const Template: Story<IInput> = (args) => <Input {...args} />

export const Primary = Template.bind({})
Primary.args = {
  value: '',
  placeholder: 'Input text here ...',
}
