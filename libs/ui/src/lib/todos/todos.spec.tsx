import {render} from '@testing-library/react'

import Todos from './todos'

describe('@libs/ui/todo', () => {
  it('should render successfully', () => {
    const {baseElement} = render(<Todos todos={[]} onItem={jest.fn} onRemoveItem={jest.fn} />)
    expect(baseElement).toBeTruthy()
  })
})
