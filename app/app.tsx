import Header from '@/app/components/Header'
import GridContainer from '@/app/components/GridContainer'
import TopRightSquare from '@/app/components/TopRightSquare'
import BottomRightSquare from '@/app/components/BottomRightSquare'
import MainSquare from '@/app/components/MainSquare'
import { ExecutionContextProvider } from '@/app/components/ExecutionContext'
import './styles/app.css'

export default function App() {
  return (
    <ExecutionContextProvider>
      <div className="bg-[#fff1c2] dark:bg-[#2c2c2c] flex flex-col items-start relative w-full h-full overflow-hidden">
        <Header />
        <GridContainer>
          <MainSquare />
          <TopRightSquare />
          <BottomRightSquare />
        </GridContainer>
      </div>
    </ExecutionContextProvider>
  )
}
