import http from './http'
import {Response} from '@_/models/lib/api'
import {UserDto} from '@_/models/lib/user'
import {requestParams} from '@_/models/_requestParams'

interface UserApi {
  getUserByUsername(username: string): Promise<Response<UserDto>>
}

class UserApiImpl implements UserApi {
  _namespace = '/users'

  getUserByUsername(username: string): Promise<Response<UserDto>> {
    const url = requestParams(this._namespace, {username})
    return http.get(url)
  }
}

export default new UserApiImpl()
