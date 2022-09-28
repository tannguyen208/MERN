import * as Qs from 'query-string'
import {IEntity} from './_entity'
import {IPagination} from './_pagination'

export type TRequestParamsOptions<T> = IEntity &
  Pick<IPagination<T>, 'page' | 'limit'> & {[key: string]: unknown}

export const requestParams = <T = unknown>(
  endpoint: string,
  options?: Partial<TRequestParamsOptions<T>>
): string =>
  Qs.stringifyUrl({
    url: endpoint,
    query: (options || {}) as Qs.StringifiableRecord,
  })
