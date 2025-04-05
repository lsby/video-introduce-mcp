import { Circle, makeScene2D } from '@revideo/2d'
import { all, createRef, tween } from '@revideo/core'

export let 动画 = makeScene2D('动画', function* (view) {
  // https://motioncanvas.io/docs/flow
  // 有了引用, 我们就可以操作显示对象, 产生动画了
  let circle = createRef<Circle>()
  view.add(<Circle ref={circle} width={100} height={100} fill={'red'} />)

  // 动画是一个过程, 需要用yield*等待它执行完成
  yield* circle().fill('blue', 1)

  // 对于一个属性的连续操作, 可以用to连起来
  yield* circle().fill('green', 1).to('red', 1)

  // 如果想同时执行很多动画, 可以用组合器
  yield* all(circle().fill('#0000ff', 0.5), circle().size(200, 1))

  // https://motioncanvas.io/docs/tweening
  // 更本质的方法是通过补间
  // 第一个参数是时间, 第二个参数是函数, 这个函数每一帧都会被调用
  // 函数会有一个参数, 是0到1之间的数, 表示当前补间的进度
  yield* tween(2, (value) => {
    circle().width(value * 100)
    circle().height(value * 100)
  })
})
