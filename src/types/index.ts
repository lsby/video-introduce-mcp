import { Promisable, ThreadGenerator } from '@revideo/core'

export type 迭代器通用返回类型 = Generator<void | ThreadGenerator | Promise<any> | Promisable<any>, void, any>
