import { ReactNode } from 'react'

interface MainSquareProps {
  children?: ReactNode
}

import React from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { createTheme } from '@uiw/codemirror-themes'
import { useExecution } from '@/app/components/ExecutionContext'
// import { javascript } from '@codemirror/lang-javascript'

const theme = createTheme({
  theme: 'light',
  settings: {
    background: '#2c2c2c',
    gutterBackground: '#2c2c2c',
    lineHighlight: '#3f3f3f26',
    gutterActiveForeground: '#f3f3f3',
    gutterBorder: '#3f3f3f',
    gutterForeground: '#f3f3f3',
    foreground: '#f3f3f3',
    caret: '#f3f3f3',
    selection: '#036dd626',
    selectionMatch: '#036dd626',
  },
  styles: [],
})

export default function MainSquare(_props: MainSquareProps) {
  const { code, setCode } = useExecution()

  return (
    <div
      style={{ gridArea: '1 / 1 / span 4 / span 7' }}
      className="shrink-0 bg-[#fff1c2] dark:bg-[#2c2c2c] flex flex-col"
    >
      <div className="flex-1">
        <CodeMirror value={code} height="100%" onChange={(val) => setCode(val)} theme={theme} />
      </div>
    </div>
  )
}
