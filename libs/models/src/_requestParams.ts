import {Entity} from './_entity'
import {Pagination} from './_pagination'
import * as Qs from 'query-string'

export type TRequestParamsOptions<T> = Entity & Pick<Pagination<T>, 'page' | 'limit'> & {[key: string]: unknown}

export const requestParams = <T = unknown>(
  endpoint: string, //
  options?: Partial<TRequestParamsOptions<T>>
): string =>
  Qs.stringifyUrl({
    query: (options || {}) as Qs.StringifiableRecord,
    url: endpoint,
  })
