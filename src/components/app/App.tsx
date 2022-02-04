import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { myTheme } from '../../myTheme'
import { Card as C } from '../Card'
import { ManWalking } from '../ManWalking'
import { ManProgramming } from '../ManProgramming'
import { SoccerField } from '../SoccerField'
import { Screen as S } from '../Screen'
import { useGetWidthAndHeight } from '../../hooks'

const lotties = [ManWalking, ManProgramming, SoccerField]

const Card = styled(C)<{ top?: number; left?: number }>`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
`

export const App = () => {
  const { width, height, ref } = useGetWidthAndHeight()

  return (
    <ThemeProvider theme={myTheme}>
      <Screen>
        <CardWrapper>
          <Card width={200} ref={ref} top={-height / 2} left={-width / 2}>
            <ManProgramming />
          </Card>
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
