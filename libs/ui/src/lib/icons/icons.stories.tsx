import {Story, Meta} from '@storybook/react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Nope = (props: any) => <button {...props} />

export default {
  component: Nope,
  title: 'Icons',
} as Meta

const Template: Story = (args) => <Nope {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: 'Click here!',
  onClick() {
    window.open('https://ant.design/components/icon/', '_blank')
  },
}
