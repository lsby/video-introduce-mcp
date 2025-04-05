import { Circle, makeScene2D } from '@revideo/2d'
import { createRef, createSignal, waitFor } from '@revideo/core'

export let 信号 = makeScene2D('信号', function* (view) {
  // https://motioncanvas.io/docs/signals
  // 信号类似react的状态, 当修改时, 依赖它的显示对象也会一起变化
  let radius = createSignal(100)

  // 信号可以被直接用在属性里
  let circle = createRef<Circle>()
  view.add(<Circle ref={circle} width={radius} height={radius} fill={'red'} />)
  yield* waitFor(0.5)

  // 可以立即修改信号
  radius(200)
  yield* waitFor(0.5)

  // 也可以渐变的修改信号
  yield* radius(150, 1)
})
