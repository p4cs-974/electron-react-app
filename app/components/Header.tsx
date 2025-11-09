import { Sun, Moon, Play } from 'lucide-react'
import { Button } from './ui/button'
import { useEffect, useState } from 'react'
import { useConveyor } from '@/app/hooks/use-conveyor'
import { useExecution } from '@/app/components/ExecutionContext'

export default function Header() {
  const { compileAndRun } = useConveyor('app')
  const { setResult, setIsRunning, isRunning, code } = useExecution()
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize from actual DOM state
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark')
    }
    return false
  })

  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark')
      setIsDarkMode(isDark)
    }

    // Check initial state
    checkDarkMode()

    // Watch for dark mode changes
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  const toggleDarkMode = () => {
    const htmlElement = document.documentElement
    const isDark = htmlElement.classList.toggle('dark')
    setIsDarkMode(isDark)
    console.log('Dark mode toggled:', isDark, 'Classes:', htmlElement.className)
    // Force style recalculation
    void htmlElement.offsetHeight
  }

  const handleRun = async () => {
    setIsRunning(true)
    try {
      const result = await compileAndRun(code)
      setResult(result)
    } catch (error) {
      setResult({
        stdout: '',
        stderr: error instanceof Error ? error.message : 'Unknown error occurred',
        exitCode: -1,
      })
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="flex items-center justify-between p-[10px] shrink-0 min-w-0 overflow-clip w-full">
      <div className="flex gap-3 items-end shrink-0">
        <div className="h-[54px] overflow-clip shrink-0 w-[46px] text-[#c00f0c] dark:text-[#f19edc]">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 531.8 617.879"
            className="block max-w-none size-full"
          >
            <g>
              <rect height="617.879" opacity="0" width="531.8" x="0" y="0" />
              <path
                d="M403.473 245.585C433.014 245.585 456.94 221.659 456.94 192.118C456.94 162.577 433.014 138.651 403.473 138.651C373.932 138.651 350.251 162.577 350.251 192.118C350.251 221.659 373.932 245.585 403.473 245.585ZM266.022 15.6045C243.073-7.58883 215.729-6.36812 180.085 29.0323C160.309 49.2959 149.811 90.0674 143.463 119.12L107.331 155.497C96.1001 166.728 98.5415 182.108 108.551 192.118L180.573 263.896C185.211 268.046 191.071 270.731 197.907 270.731L246.735 270.731C248.444 270.731 249.176 273.417 247.711 274.149L196.93 299.54C153.717 320.78 143.708 378.153 187.653 410.624L277.985 476.542L225.495 581.523C219.391 593.73 224.274 608.866 236.237 614.726C247.467 620.341 262.604 616.923 269.44 603.739L329.987 482.646C334.87 472.636 335.846 460.429 324.86 449.442L252.106 376.933L346.833 329.814C351.471 327.372 356.598 328.349 359.772 331.767L489.899 461.649C499.665 471.415 515.778 470.927 524.567 461.649C534.088 451.884 534.333 436.503 524.567 426.737L332.672 234.843C324.127 226.298 315.094 221.415 303.131 221.415L208.161 221.415L143.952 157.206L162.995 138.163C192.047 132.06 233.063 121.562 252.594 101.542C288.483 66.1416 289.704 38.5538 266.022 15.6045ZM247.223 34.8916C259.919 47.3428 255.768 59.794 233.551 82.4991C219.635 96.1709 193.512 102.519 173.737 108.378C179.108 88.1143 185.7 62.4795 199.616 48.3194C222.077 25.8584 234.04 22.1963 247.223 34.8916ZM24.8111 518.29L148.59 518.29C159.088 518.29 167.633 510.722 172.028 501.689L198.883 447.733L173.737 429.423C163.727 421.855 156.647 414.53 151.276 406.718L130.524 468.73L24.8111 468.73C11.3833 468.73 0.152878 479.96 0.152878 493.388C0.152878 507.548 11.3833 518.29 24.8111 518.29Z"
                fill="currentColor"
              />
            </g>
          </svg>
        </div>
        <div className="flex flex-col font-['JetBrains_Mono',monospace] justify-end leading-[18px] shrink-0 text-[#c00f0c] dark:text-[#f19edc] text-[42px] whitespace-pre">
          <p className="mb-0">Squash IDE</p>
          <p>&nbsp;</p>
        </div>
      </div>
      <div className="flex gap-3 items-center justify-center shrink-0">
        <button onClick={toggleDarkMode} className="cursor-pointer">
          {isDarkMode ? <Moon size={48} className="text-[#f19edc]" /> : <Sun size={48} className="text-foreground" />}
        </button>
        <Button
          onClick={handleRun}
          disabled={isRunning}
          className="bg-[#c00f0c] dark:bg-[#f19edc] text-[#f5f5f5] dark:text-[#1e1e1e] hover:bg-[#c00f0c]/90 dark:hover:bg-[#f19edc]/90 gap-2 px-3 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play size={16} />
          <span className="font-['JetBrains_Mono',monospace] leading-none text-base whitespace-pre">
            {isRunning ? 'Running...' : 'Run Code'}
          </span>
        </Button>
      </div>
    </div>
  )
}
