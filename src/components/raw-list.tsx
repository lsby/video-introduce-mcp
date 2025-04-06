import { Node, Rect } from '@revideo/2d'
import { createRef } from '@revideo/core'
import { 迭代器通用返回类型 } from '../types'

export function* 行列表组件(展示区域: Rect, 内容: Node[]): Generator<never, { 下一个(): 迭代器通用返回类型 }, unknown> {
  let 当前索引 = 0

  let 内部区域引用 = createRef<Rect>()
  展示区域.add(<Rect layout ref={内部区域引用} direction={'row'} justifyContent={'space-around'} width={'100%'} gap={50} padding={50} />)

  function* 下一个(): 迭代器通用返回类型 {
    let 本次内容 = 内容[当前索引] ?? null
    if (本次内容 === null) throw new Error('数组越界')
    let 内部区域 = 内部区域引用()
    内部区域.add(本次内容)
    当前索引++
  }

  return { 下一个 }
}
