import { makeScene2D, Txt } from '@revideo/2d'
import { createRef, waitFor } from '@revideo/core'

export let 引用 = makeScene2D('引用', function* (view) {
  // https://motioncanvas.io/docs/references
  // 为了控制显示对象 我们可以将其赋值给变量
  let nihao = <Txt>你好</Txt>
  view.add(nihao)
  yield* waitFor(0.5)

  yield view.removeChildren()

  // 但这样非常麻烦, 尤其是很深的组合的情况下.
  // 有一个更好的写法
  // 创建一个"引用"
  // 然后使用ref属性与其绑定
  let 文本引用 = createRef<Txt>()
  view.add(<Txt ref={文本引用}>你好</Txt>)
  yield* waitFor(0.5)
})
