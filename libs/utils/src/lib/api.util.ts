import {IResponse} from '@apps/data'
import * as HttpStatusCodes from 'http-status-codes'

export const RequestUtils = {
  ...HttpStatusCodes,
}

export const ResponseUtils = {
  ...HttpStatusCodes,
  success: (response: Partial<IResponse>) => ({success: true, ...response}),
  failure: (response: Partial<IResponse>) => ({success: false, ...response}),
}
