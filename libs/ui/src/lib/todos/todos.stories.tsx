import {Story, Meta} from '@storybook/react'
import type {Todo} from '@apps/data'
import {Todos, TodosProps} from './todos'

export default {
  component: Todos,
  title: 'Todos',
} as Meta

const Template: Story<TodosProps> = (args) => <Todos {...args} />

export const Primary = Template.bind({})
Primary.args = {
  todos: [{_id: 'drink-coffee', title: 'Drink coffee', done: false}] as Todo[],
  onItem: console.log,
  onRemoveItem: console.log,
}
