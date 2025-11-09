import { type App } from 'electron'
import { handle } from '@/lib/main/shared'
import { compileAndRun } from '@/lib/main/compilerRunner'

export const registerAppHandlers = (app: App) => {
  // App operations
  handle('version', () => app.getVersion())

  // Compiler operations
  handle('compileAndRun', async ({ source }) => {
    return await compileAndRun(source)
  })
}
