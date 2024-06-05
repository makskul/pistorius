import {addImportsDir, addPlugin, createResolver, defineNuxtModule} from '@nuxt/kit'
import { join } from 'pathe'

export default defineNuxtModule({
  meta: {
    name: '@app/api'
  },

  setup (_options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = resolve('runtime')

    nuxt.options.build.transpile.push(resolve('runtime'))

    addImportsDir(join(runtimeDir, 'composables'))
    addPlugin({ src: join(runtimeDir, 'plugin') }, { append: true })
  }
})
