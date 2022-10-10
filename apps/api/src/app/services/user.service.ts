import mongoose from 'mongoose'
import {mapper} from '@_/models/_mapper'
import {Bio} from '@_/models/lib/bio'
import {Job} from '@_/models/lib/job'
import {User, UserDto} from '@_/models/lib/user'

const $schema = new mongoose.Schema({})

const $doc = mongoose.model('users', $schema)

export const middleware = {}

export const act = {
  getUserByUsername(username: string) {
    const dataUser = new User()
    dataUser.firstName = 'Nguyen'
    dataUser.lastName = 'Tan'
    dataUser.username = username
    dataUser.password = '123456'
    dataUser.bio = new Bio()
    dataUser.bio.avatarUrl = 'google.com'
    dataUser.bio.birthday = new Date().toDateString()
    dataUser.bio.job = new Job()
    dataUser.bio.job.title = 'Developer'
    dataUser.bio.job.salary = 500

    return mapper.map(dataUser, User, UserDto)
  },
}
