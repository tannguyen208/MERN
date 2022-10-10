import {MapperOmitType} from '@automapper/classes/mapped-types'
import {AutoMap} from '@automapper/classes'
import {Entity} from '../_entity'
import {Bio, BioDto} from './bio'

export class User extends Entity {
  @AutoMap()
  firstName!: string

  @AutoMap()
  lastName!: string

  @AutoMap()
  username!: string

  password!: string // <- we purposely left this one out because we don't want to map "password"

  @AutoMap(() => Bio)
  bio!: Bio
}

export class UserDto extends MapperOmitType(User, ['bio']) {
  @AutoMap()
  fullName!: string

  @AutoMap(() => BioDto)
  bio!: BioDto
}
