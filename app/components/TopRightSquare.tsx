import { ReactNode } from 'react'
import { useExecution } from '@/app/components/ExecutionContext'

interface TopRightSquareProps {
  children?: ReactNode
}

export default function TopRightSquare({ children }: TopRightSquareProps) {
  const { result, isRunning } = useExecution()

  return (
    <div
      style={{ gridArea: '1 / 8 / span 2 / -1' }}
      className="border-b-[12px] border-l-[12px] border-r-0 border-t-0 border-[#c00f0c] dark:border-[#f19edc] border-solid shrink-0 mb-[-12px] z-40 bg-[#fff1c2] dark:bg-[#2c2c2c] p-4 overflow-auto"
    >
      {children}
      <div className="h-full">
        {isRunning ? (
          <div className="text-gray-600 dark:text-gray-400">Running...</div>
        ) : result ? (
          <div className="h-full flex flex-col gap-2">
            {result.stdout && (
              <div>
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Output:</div>
                <pre className="text-xs font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-auto text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                  {result.stdout}
                </pre>
              </div>
            )}
            {result.stderr && (
              <div>
                <div className="text-sm font-semibold text-red-600 dark:text-red-400 mb-1">Error:</div>
                <pre className="text-xs font-mono bg-red-50 dark:bg-red-900/20 p-2 rounded overflow-auto text-red-800 dark:text-red-300 whitespace-pre-wrap">
                  {result.stderr}
                </pre>
              </div>
            )}
            {result.exitCode !== undefined && (
              <div className="text-xs text-gray-500 dark:text-gray-400">Exit code: {result.exitCode}</div>
            )}
          </div>
        ) : (
          <div className="text-gray-500 dark:text-gray-400 text-sm">No output yet. Click "Run code" to execute.</div>
        )}
      </div>
    </div>
  )
}
