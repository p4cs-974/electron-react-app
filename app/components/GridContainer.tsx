import { ReactNode } from 'react'

interface GridContainerProps {
  children: ReactNode
}

export default function GridContainer({ children }: GridContainerProps) {
  return (
    <div className="border-[#c00f0c] dark:border-[#f19edc] border-[12px] border-solid flex-1 h-full w-full">
      <div className="box-border grid grid-cols-[repeat(12,_minmax(0px,_1fr))] grid-rows-[repeat(4,_minmax(0px,_1fr))] overflow-clip h-full">
        {children}
      </div>
    </div>
  )
}
