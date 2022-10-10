import {AutoMap} from '@automapper/classes'
import {Job} from './job'
import {MapperOmitType} from '@automapper/classes/mapped-types'

export class Bio {
  @AutoMap(() => Job)
  job!: Job

  @AutoMap()
  birthday!: string

  @AutoMap()
  avatarUrl!: string
}

export class BioDto extends MapperOmitType(Bio, ['job']) {
  @AutoMap()
  jobTitle!: string

  @AutoMap()
  jobSalary!: number
}
