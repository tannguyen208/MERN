import * as API from './api'

describe('@libs/models/api', () => {
  it('should to undefined', () => {
    const response = new API.Response()
    expect(response._id).toBeUndefined()
  })
})
