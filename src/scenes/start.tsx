import { Circle, Img, makeScene2D } from '@revideo/2d'
import { waitFor } from '@revideo/core'

export let 快速开始 = makeScene2D('快速开始', function* (view) {
  // 可以给视图挂载显示对象
  // 显示对象可以点进 @revideo/2d 查看
  // 显示对象的属性可以点进类型查看
  view.add(<Circle width={140} height={140} fill="#e13238" />)

  // 用这个函数等待若干秒
  // 函数前面可以写yield或yield*
  // yield表示等待这个函数内部执行到yield, 然后返回
  // yield*表示将控制权转移给这个函数, 只有这个函数执行最终完成(而不仅仅是到yield), 控制权才会返回
  // 没有yield的话程序就不会在这里停留, 也就看不到视频效果
  yield* waitFor(1)

  // 本地图片放在public里, 就可以这样引用
  view.add(<Img src={'/motioncanvas.svg'} y={-200} />)
  yield* waitFor(1)
})
