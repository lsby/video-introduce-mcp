import { CubicBezier, makeScene2D } from '@revideo/2d'
import { waitFor } from '@revideo/core'

export let 连线 = makeScene2D('连线', function* (view) {
  // 贝塞尔曲线: https://motioncanvas.io/docs/bezier-curves
  // 一般样条线: https://motioncanvas.io/docs/spline
  // 路径线: https://motioncanvas.io/docs/path
  view.add(
    <CubicBezier
      lineWidth={6}
      stroke={'lightseagreen'}
      p0={[-200, -70]}
      p1={[120, -120]}
      p2={[-120, 120]}
      p3={[200, 70]}
    />,
  )
  yield* waitFor(1)
})
