import {Story, Meta} from '@storybook/react'
import {Todo} from '@_/models/lib/todo'
import {Todos, TodosProps} from './todos'

export default {
  component: Todos,
  title: 'Todos',
} as Meta

const Template: Story<TodosProps> = (args) => <Todos {...args} />

export const Primary = Template.bind({})
Primary.args = {
  onItem: console.log,
  onRemoveItem: console.log,
  todos: [{_id: 'drink-coffee', done: false, title: 'Drink coffee'}] as Todo[],
}
