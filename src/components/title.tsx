import { Rect, Txt } from '@revideo/2d'
import { 迭代器通用返回类型 } from '../types'

export function* 主标题组件(展示区域: Rect, 标题: string, 子标题: string): 迭代器通用返回类型 {
  展示区域.add(<Txt text={标题} fontSize={100} />)
  展示区域.add(<Txt text={子标题} fontSize={80} y={120} />)
}
