/* eslint-disable no-useless-escape */
import {Request, Response, NextFunction} from 'express'

export const id = (req: Request, res: Response, next: NextFunction): void => {
  const id = (req.query._id || '') as string
  const specialCharacters = /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\?\[\]\^\|]+/

  // If: has <_id> & <_id> has special characters, then return bad request
  if (Boolean(id) && specialCharacters.test(id)) {
    res
      .status(400)
      .json({message: "Invalid. _id can't including special characters"})
  }

  next()
}
