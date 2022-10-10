import {Response} from '@_/models/lib/api'
import * as HttpStatusCodes from 'http-status-codes'

export const RequestUtils = {
  ...HttpStatusCodes,
}

export const ResponseUtils = {
  ...HttpStatusCodes,
  failure: (response: Partial<Response>) => ({success: false, ...response}),
  success: (response: Partial<Response>) => ({success: true, ...response}),
}
