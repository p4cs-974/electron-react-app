import { z } from 'zod'

export const appIpcSchema = {
  version: {
    args: z.tuple([]),
    return: z.string(),
  },
  compileAndRun: {
    args: z.tuple([
      z.object({
        source: z.string(),
      }),
    ]),
    return: z.object({
      stdout: z.string(),
      stderr: z.string(),
      exitCode: z.number(),
    }),
  },
}
