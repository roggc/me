import React, {  useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { myTheme } from '../../myTheme'
import { Card as C } from '../Card'
import { ManWalking } from '../ManWalking'
import { ManProgramming } from '../ManProgramming'
import { SoccerField } from '../SoccerField'
import { Screen as S } from '../Screen'
import { useGetWidthsAndHeights } from '../../hooks'

const getLotties = () => [
  { name: 'manWalking', Lottie: ManWalking },
  { name: 'manProgramming', Lottie: ManProgramming },
    { name: 'soccerField', Lottie: SoccerField },
]

const Card = styled(C)<{ top: number; left: number; scale: number }>`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  transform: scale(${({ scale }) => scale});
  transform-origin: top left;
  --transition: transform 100ms;
  cursor: pointer;
`

export const App = () => {
  const [isActivateChange, setIsActivateChange] = useState(false)
  const [lotties, setLotties] = useState(getLotties())
  const { widths, heights, refs } = useGetWidthsAndHeights(isActivateChange,setIsActivateChange,lotties.length)

  const reorderLotties = () => {
    setLotties((prev) => {
      const reordered = prev.slice(1)
      reordered.push(prev[0])
      return reordered
    }) 
    setIsActivateChange(true)
  }

  return (
    <ThemeProvider theme={myTheme}>
      <Screen>
        <CardWrapper>
          {lotties.map((lottie, index, array) => (
            <Card
              width={200}
              top={-heights[index] / 2}
              left={-widths[index] / 2}
              ref={(el) => refs.current.push(el)}
              key={lottie.name}
              scale={1 / (array.length - index)}
              onClick={reorderLotties}
            >
              <lottie.Lottie />
            </Card>
          ))}
        </CardWrapper>
      </Screen>
    </ThemeProvider>
  )
}

const CardWrapper = styled.div`
  position: relative;
`

const Screen = styled(S)`
  display: flex;
  justify-content: center;
  align-items: center;
`
