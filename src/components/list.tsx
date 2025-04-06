import { Rect, Txt } from '@revideo/2d'
import { createRef } from '@revideo/core'
import { 迭代器通用返回类型 } from '../types'

export function* 列表组件(
  展示区域: Rect,
  内容: string[],
  opt?: {
    高度?: number
    字体大小?: number
  },
): Generator<never, { 下一个(区域: '左' | '右'): 迭代器通用返回类型 }, unknown> {
  let 当前索引 = 0

  let 内部区域左引用 = createRef<Rect>()
  let 内部区域右引用 = createRef<Rect>()
  let 内部区域y = opt?.高度 ?? 300
  展示区域.add(
    <Rect
      layout
      ref={内部区域左引用}
      direction={'column'}
      justifyContent={'start'}
      alignItems={'start'}
      x={-600}
      y={内部区域y}
      width={500}
      gap={50}
      padding={50}
    />,
  )
  展示区域.add(
    <Rect
      layout
      ref={内部区域右引用}
      direction={'column'}
      justifyContent={'start'}
      alignItems={'start'}
      x={300}
      y={内部区域y}
      width={500}
      gap={50}
      padding={50}
    />,
  )

  function* 下一个(区域: '左' | '右'): 迭代器通用返回类型 {
    let 本次内容 = 内容[当前索引] ?? null
    if (本次内容 === null) throw new Error('数组越界')

    let 内部区域: Rect
    switch (区域) {
      case '左': {
        内部区域 = 内部区域左引用()
        break
      }
      case '右': {
        内部区域 = 内部区域右引用()
        break
      }
      default: {
        throw new Error('非预期的区域')
      }
    }

    内部区域.add(<Txt text={本次内容} fontSize={opt?.字体大小 ?? 80} />)
    yield 内部区域.position({ x: 内部区域.x(), y: 内部区域.height() / 2 - 内部区域y })

    当前索引++
  }

  return { 下一个 }
}
