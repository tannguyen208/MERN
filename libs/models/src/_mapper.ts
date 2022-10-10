import {createMap, extend, forMember, mapFrom, typeConverter} from '@automapper/core'
import {CamelCaseNamingConvention, createMapper} from '@automapper/core'
import {classes} from '@automapper/classes'

// entity and dto
import {Entity} from './_entity'
import {Bio, BioDto} from './lib/bio'
import {User, UserDto} from './lib/user'
import {Todo, TodoDto} from './lib/todo'

// Create and export the mapper
export const mapper = createMapper({
  namingConventions: new CamelCaseNamingConvention(),
  strategyInitializer: classes(),
})

// common mapping config functions
export const commonMappingConfigFns = {
  typeConverterForDate: typeConverter(Date, String, (date) => date.toDateString()),
}

// Mappers
createMap(
  mapper,
  Entity,
  forMember(
    (d: Entity) => d._id,
    mapFrom((s: Entity) => s._id.toString())
  )
)
createMap(mapper, Todo, TodoDto, extend(Entity, Entity))
createMap(mapper, TodoDto, Todo, extend(Entity, Entity))
createMap(
  mapper,
  User,
  UserDto,
  forMember(
    (destination) => destination.fullName,
    mapFrom((source) => `${source.firstName} ${source.lastName}`)
  )
)
createMap(mapper, UserDto, User)
createMap(mapper, Bio, BioDto, commonMappingConfigFns.typeConverterForDate)
createMap(mapper, BioDto, Bio)
