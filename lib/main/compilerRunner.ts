import { app } from 'electron'
import { existsSync, promises as fs } from 'node:fs'
import { join } from 'node:path'
import os from 'node:os'
import { spawn } from 'node:child_process'

const TIMEOUT_MS = 15000 // 15 seconds per step

function resolveCompilerJar(): string {
  // Check environment variable override
  const env = process.env.SQUASH_COMPILER_PATH
  if (env && existsSync(env)) {
    return env
  }

  // Development path
  const dev = join(process.cwd(), 'compiler', 'Compilador.jar')
  if (!app.isPackaged && existsSync(dev)) {
    return dev
  }

  // Packaged path
  return join(process.resourcesPath, 'compiler', 'Compilador.jar')
}

interface RunResult {
  stdout: string
  stderr: string
  code: number
}

function run(cmd: string, args: string[], opts: any = {}): Promise<RunResult> {
  return new Promise<RunResult>((resolve, reject) => {
    const child = spawn(cmd, args, { ...opts, shell: false })
    let stdout = ''
    let stderr = ''

    child.stdout?.on('data', (d) => {
      stdout += d.toString()
    })

    child.stderr?.on('data', (d) => {
      stderr += d.toString()
    })

    const timeout = setTimeout(() => {
      child.kill()
      reject(new Error(`Command timed out after ${TIMEOUT_MS}ms: ${cmd} ${args.join(' ')}`))
    }, TIMEOUT_MS)

    child.on('error', (err) => {
      clearTimeout(timeout)
      reject(err)
    })

    child.on('close', (code) => {
      clearTimeout(timeout)
      resolve({ stdout, stderr, code: code ?? -1 })
    })
  })
}

async function checkTool(tool: string, versionArg: string = '--version'): Promise<boolean> {
  try {
    const result = await run(tool, [versionArg])
    return result.code === 0
  } catch {
    return false
  }
}

export interface CompileAndRunResult {
  stdout: string
  stderr: string
  exitCode: number
}

export async function compileAndRun(source: string): Promise<CompileAndRunResult> {
  // Resolve compiler JAR path
  const jar = resolveCompilerJar()
  if (!existsSync(jar)) {
    return {
      stdout: '',
      stderr: 'Compiler JAR not found. Please place Compilador.jar in the compiler/ folder or set SQUASH_COMPILER_PATH environment variable.',
      exitCode: -1,
    }
  }

  // Preflight checks
  const hasJava = await checkTool('java', '-version')
  if (!hasJava) {
    return {
      stdout: '',
      stderr: 'Java is not installed or not in PATH. Please install Java to use the compiler.',
      exitCode: -1,
    }
  }

  const hasRustc = await checkTool('rustc', '--version')
  if (!hasRustc) {
    return {
      stdout: '',
      stderr: 'rustc is not installed or not in PATH. Please install Rust to compile and run code.',
      exitCode: -1,
    }
  }

  // Create temporary directory
  const dir = await fs.mkdtemp(join(os.tmpdir(), 'squash-'))
  const inFile = join(dir, 'input.sq')
  const rsFile = join(dir, 'output.rs')
  const bin = join(dir, process.platform === 'win32' ? 'prog.exe' : 'prog')

  try {
    // Write input file
    await fs.writeFile(inFile, source, 'utf8')

    // Step 1: Run Java compiler
    let result = await run('java', ['-jar', jar, '--in', inFile, '--out', rsFile])
    
    // Check if output.rs was generated (even if exit code is 0, the file might not exist on error)
    if (!existsSync(rsFile)) {
      // Combine stdout and stderr to capture all error messages
      const errorMsg = [result.stdout, result.stderr].filter(Boolean).join('\n') || 'Compiler failed: output.rs was not generated'
      return {
        stdout: errorMsg,
        stderr: '',
        exitCode: result.code !== 0 ? result.code : -1,
      }
    }
    
    if (result.code !== 0) {
      return {
        stdout: '',
        stderr: result.stderr || 'Compiler failed',
        exitCode: result.code,
      }
    }

    // Step 2: Compile Rust code
    result = await run('rustc', ['-O', rsFile, '-o', bin])
    if (result.code !== 0) {
      return {
        stdout: '',
        stderr: result.stderr || 'rustc failed',
        exitCode: result.code,
      }
    }

    // Step 3: Execute binary
    const execResult = await run(bin, [])
    return {
      stdout: execResult.stdout,
      stderr: execResult.stderr,
      exitCode: execResult.code,
    }
  } catch (error) {
    return {
      stdout: '',
      stderr: error instanceof Error ? error.message : 'Unknown error occurred',
      exitCode: -1,
    }
  } finally {
    // Cleanup temp files (best effort)
    try {
      await fs.rm(dir, { recursive: true, force: true })
    } catch {
      // Ignore cleanup errors
    }
  }
}

