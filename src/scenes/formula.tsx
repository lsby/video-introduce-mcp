import { Latex, makeScene2D, Rect } from '@revideo/2d'
import { waitFor } from '@revideo/core'

export let 公式 = makeScene2D('公式', function* (view) {
  // https://motioncanvas.io/docs/latex
  view.add(
    <>
      <Rect fill={'black'} width={'100%'} height={'100%'}></Rect>
      <Latex tex="a^2 + b^2 = c^2" fill="white" width={800} />
    </>,
  )
  yield* waitFor(1)
})
