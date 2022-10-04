import {chunk} from 'lodash'
import {Schema} from './_schema'

export interface IPagination<T> {
  page: number
  limit: number
  totalPages: number
  count: number
  canPrev: boolean
  canNext: boolean
  data: T[]
}

export const PAGE_DEFAULT = 1
export const LIMIT_DEFAULT = 10

export class PaginationSchema<T> extends Schema<IPagination<T>> {
  constructor(schema: Pick<IPagination<T>, 'limit' | 'page'>) {
    super(schema, '@pagination')

    schema.page = schema.page || PAGE_DEFAULT
    schema.limit = schema.limit || LIMIT_DEFAULT

    this.setPage(parseInt(schema.page.toString()))
    this.setLimit(parseInt(schema.limit.toString()))
  }

  build(all: T[] = []) {
    const chunked = chunk(all, this.limit)
    const pageIndex = this.page - 1
    const totalPages = chunked.length

    this.setCount(all.length)
    this.setTotalPages(totalPages)
    this.setCanPrev(pageIndex > 0)
    this.setCanNext(pageIndex + 1 < totalPages)
    this.setData(chunked[pageIndex])

    return this
  }

  toJson(): IPagination<T> {
    return {
      limit: this.limit,
      page: this.page,
      totalPages: this.totalPages,
      count: this.count,
      canPrev: this.canPrev,
      canNext: this.canNext,
      data: this.data,
    }
  }

  get limit(): number {
    return this._value.limit as number
  }

  setLimit(limit?: number) {
    this._value.limit = limit
  }

  get page(): number {
    return this._value.page as number
  }

  setPage(page?: number) {
    this._value.page = page
  }

  get totalPages(): number {
    return this._value.totalPages as number
  }

  setTotalPages(totalPages: number) {
    this._value.totalPages = totalPages
  }

  get count(): number {
    return this._value.count || 0
  }

  setCount(count: number) {
    this._value.count = count
  }

  get canPrev(): boolean {
    return this._value.canPrev || false
  }

  setCanPrev(canPrev: boolean) {
    this._value.canPrev = canPrev
  }

  get canNext(): boolean {
    return this._value.canNext || false
  }

  setCanNext(canNext: boolean) {
    this._value.canNext = canNext
  }

  get data(): T[] {
    return this._value.data || []
  }

  setData(data: T[] = []) {
    this._value.data = data
  }
}
