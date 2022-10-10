import UserApiImpl from '../apis/user.api'

class UserService {
  getUserByUsername(username: string) {
    return UserApiImpl.getUserByUsername(username)
  }
}

export default new UserService()
