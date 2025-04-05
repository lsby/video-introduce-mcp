import { makeScene2D } from '@revideo/2d'
import { tts } from '../components/tts'

export let TTS = makeScene2D('TTS', function* (view) {
  yield* tts(view, '你好, 这是一句话', { 指导: '用四川话说这句话', 语速: 1 })
})
