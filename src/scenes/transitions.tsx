import { makeScene2D, Txt } from '@revideo/2d'
import { createRef, Direction, slideTransition, waitFor } from '@revideo/core'

export let 过渡 = makeScene2D('过渡', function* (view) {
  // https://motioncanvas.io/docs/transitions
  // 场景间可以插入过度效果, 写在新场景的开始
  view.add(<Txt text={'新场景'} fontSize={100} />)
  yield* slideTransition(Direction.Left)
  yield* waitFor(1)

  let title = createRef<Txt>()
  view.add(<Txt ref={title} />)
})
