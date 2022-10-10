import {render} from '@testing-library/react'

import Button from './button'

describe('@libs/ui/button', () => {
  it('should render successfully', () => {
    const {baseElement} = render(<Button title="On" />)
    expect(baseElement).toBeTruthy()
  })
})
