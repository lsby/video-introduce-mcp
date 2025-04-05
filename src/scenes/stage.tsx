import { makeScene2D, Rect, Txt } from '@revideo/2d'
import { waitFor } from '@revideo/core'

export let 层次结构 = makeScene2D('层次结构', function* (view) {
  // https://motioncanvas.io/docs/hierarchy
  // 显示对象有层次结构, 可以在其下挂载子节点, 清除子节点等
  // 也可以动态的修改结构, 查询子节点等
  // 虽然使用了jsx, 但这个引擎没有使用react
  view.add(
    <Rect>
      <Rect width={100} height={100} fill={'red'} />
      <Txt>Hi</Txt>
    </Rect>,
  )
  yield* waitFor(0.5)

  yield view.removeChildren()

  view.add(<Txt>你好</Txt>)
  yield* waitFor(0.5)

  // https://motioncanvas.io/docs/layouts/
  // 容器可以使用布局
  yield view.removeChildren()
  view.add(
    <Rect layout direction={'column'}>
      <Txt>1</Txt>
      <Txt>2</Txt>
      <Txt>3</Txt>
    </Rect>,
  )
  yield* waitFor(0.5)
})
