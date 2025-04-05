import { parser } from '@lezer/javascript'
import { Code, LezerHighlighter, makeScene2D, Rect } from '@revideo/2d'
import { waitFor } from '@revideo/core'

export let 代码 = makeScene2D('代码', function* (view) {
  // https://motioncanvas.io/docs/code#parsing-and-highlighting
  // 需要定义highlighter(加亮解析器)
  view.add(
    <>
      <Rect fill={'black'} width={'100%'} height={'100%'}></Rect>
      <Code
        highlighter={new LezerHighlighter(parser.configure({ dialect: 'jsx ts' }))}
        fontSize={200}
        code={'let number = 7;'}
      />
    </>,
  )
  yield* waitFor(1)
})
