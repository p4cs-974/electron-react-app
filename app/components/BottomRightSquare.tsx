import { ReactNode } from 'react'

interface BottomRightSquareProps {
  children?: ReactNode
}

export default function BottomRightSquare({ children }: BottomRightSquareProps) {
  return (
    <div
      style={{ gridArea: '3 / 8 / span 2 / -1' }}
      className="border-l-[12px] border-r-0 border-b-0 border-t-0 border-l-[12px] border-[#c00f0c] dark:border-[#f19edc] border-solid shrink-0 h-full"
    >
      <Frame />
    </div>
  )
}

/** @paper-design/shaders-react@0.0.62 */
import { Dithering } from '@paper-design/shaders-react'

/**
 * Code exported from Paper
 * https://app.paper.design/file/01K9G6E9PSZ9F4E30E6D8P1QT6?node=01K9G9KZVBETQZ6PCQWRR0AF4F
 * on Nov 7, 2025 at 8:16 PM.
 */
export function Frame() {
  return (
    <div
      style={{
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#2C2C2C',
        boxSizing: 'border-box',
        contain: 'content',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: '0',
        height: 'fit-content',
        justifyContent: 'center',
        overflowWrap: 'break-word',
        paddingBlock: '0px',
        paddingInline: '0px',
        width: 'auto',
      }}
    >
      <div
        style={{
          backgroundColor: '#2C2C2C',
          boxSizing: 'border-box',
          contain: 'layout',
          flexShrink: '0',
          height: '495px',
          overflowWrap: 'break-word',
          width: '299px',
        }}
      >
        <div
          style={{
            backgroundImage:
              'url(https://workers.paper.design/file-assets/01K9G6E9PSZ9F4E30E6D8P1QT6/01K9G8R473MGZPYXF70C42ZWWZ.webp)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            boxSizing: 'border-box',
            contain: 'content',
            height: '495px',
            left: '0',
            mixBlendMode: 'color',
            overflowWrap: 'break-word',
            position: 'fixed',
            top: '0',
            translate: '0px 0px',
            width: '299px',
          }}
        />
        <Dithering
          colorBack="#00000000"
          colorFront="#B0B0B0"
          speed={0.5}
          shape="sphere"
          type="8x8"
          size={1.3}
          scale={0.97}
          frame={861272.113000002}
          style={{
            height: '495px',
            left: '0',
            mixBlendMode: 'color-dodge',
            position: 'fixed',
            top: '0',
            translate: '-2px 0px',
            width: '299px',
          }}
        />
      </div>
    </div>
  )
}
