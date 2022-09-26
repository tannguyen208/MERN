import {render} from '@testing-library/react'

import Todos from './todos'

describe('Todos', () => {
  it('should render successfully', () => {
    const {baseElement} = render(
      <Todos todos={[]} onItem={jest.fn} onRemoveItem={jest.fn} />
    )
    expect(baseElement).toBeTruthy()
  })
})
