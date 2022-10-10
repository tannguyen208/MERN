import {Request, Response, NextFunction} from 'express'
import {isNull} from 'lodash'
import {ResponseUtils} from '@_/utils/lib/api.util'
import {errorMessages} from '../constants/errorMessages'

export const id = (req: Request, res: Response, next: NextFunction): void => {
  const id = (req.query._id || '') as string
  // eslint-disable-next-line no-useless-escape
  const specialCharacters = /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\?\[\]\^\|]+/

  // If: has Id but Id is null, or empty string
  if (isNull(id)) {
    res
      .status(ResponseUtils.StatusCodes.BAD_REQUEST) //
      .json(
        ResponseUtils.failure({
          message: errorMessages.BAD_REQUEST_ID_INVALID,
        })
      )
  }

  // If: has <_id> & <_id> has special characters, then return bad request
  if (Boolean(id) && specialCharacters.test(id)) {
    res
      .status(ResponseUtils.StatusCodes.BAD_REQUEST) //
      .json(
        ResponseUtils.failure({
          message: errorMessages.BAD_REQUEST_ID_HAS_SPECIAL_CHARACTERS,
        })
      )
  }

  // Passed middleware
  next()
}
