import { Rect } from '@revideo/2d'
import { 迭代器通用返回类型 } from '../types'

export function* 清空(展示区域: Rect): 迭代器通用返回类型 {
  展示区域.removeChildren()
}
