import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface ExecutionResult {
  stdout: string
  stderr: string
  exitCode: number
}

interface ExecutionContextType {
  result: ExecutionResult | null
  setResult: (result: ExecutionResult | null) => void
  isRunning: boolean
  setIsRunning: (isRunning: boolean) => void
  code: string
  setCode: (code: string) => void
}

const ExecutionContext = createContext<ExecutionContextType | undefined>(undefined)

export const ExecutionContextProvider = ({ children }: { children: ReactNode }) => {
  const [result, setResult] = useState<ExecutionResult | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [code, setCode] = useState("console.log('hello world!');")

  return (
    <ExecutionContext.Provider value={{ result, setResult, isRunning, setIsRunning, code, setCode }}>
      {children}
    </ExecutionContext.Provider>
  )
}

export const useExecution = () => {
  const context = useContext(ExecutionContext)
  if (!context) {
    throw new Error('useExecution must be used within an ExecutionContextProvider')
  }
  return context
}

