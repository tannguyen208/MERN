import * as bodyParser from 'body-parser'

export default function () {
  // parsing application/json
  const json = bodyParser.json()

  // parsing application/x-www-form-urlencoded
  const urlencoded = bodyParser.urlencoded({extended: true})

  return [
    json, //
    urlencoded,
  ]
}
