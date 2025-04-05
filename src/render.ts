import { renderVideo } from '@revideo/renderer'

async function render(): Promise<void> {
  console.log('Rendering video...')

  let file = await renderVideo({
    projectFile: './src/project.tsx',
    settings: { logProgress: true },
  })

  console.log(`Rendered video to ${file}`)
}

render().catch(console.error)
