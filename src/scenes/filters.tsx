import { Img, makeScene2D } from '@revideo/2d'
import { createRef } from '@revideo/core'

export let 滤镜 = makeScene2D('滤镜', function* (view) {
  // https://motioncanvas.io/docs/filters-and-effects
  view.fill('#141414')
  let iconRef = createRef<Img>()
  yield view.add(<Img src={'/motioncanvas.svg'} size={200} ref={iconRef} />)
  yield* iconRef().filters.blur(10, 1)
  yield* iconRef().filters.blur(0, 1)
})
