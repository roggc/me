import React, { useState, useMemo } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { myTheme } from '../../myTheme'
import { Card as C } from '../Card'
import { ManWalking } from '../ManWalking'
import { ManProgramming } from '../ManProgramming'
import { SoccerField } from '../SoccerField'
import { Screen } from '../Screen'
import { useGetWidthsAndHeights } from '../../hooks'
import { Menu } from '@styled-icons/evaicons-solid/Menu'
import { Cross } from '@styled-icons/entypo/Cross'

const getLotties = () => [
  { name: 'manWalking', Lottie: ManWalking, footer: <Footer>walking</Footer> },
  {
    name: 'manProgramming',
    Lottie: ManProgramming,
    footer: <Footer>coding</Footer>,
  },
  {
    name: 'soccerField',
    Lottie: SoccerField,
    footer: <Footer>watching football</Footer>,
  },
]

const KEYS = ['hobbies', 'contact info']

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
  const { widths, heights, refs } = useGetWidthsAndHeights(
    isActivateChange,
    setIsActivateChange,
    lotties.length
  )
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const reorderLotties = () => {
    setLotties((prev) => {
      const reordered = prev.slice(1)
      reordered.push(prev[0])
      return reordered
    })
    setIsActivateChange(true)
  }

  const menuOptions = useMemo(
    () => KEYS.map((key) => <MenuOption key={key}>{key}</MenuOption>),
    []
  )

  return (
    <ThemeProvider theme={myTheme}>
      <Screen
        header={<Header>Some things I like</Header>}
        footer={lotties[lotties.length - 1].footer}
        menu={
          isMenuOpen ? (
            <Icon as={Cross} onClick={() => setIsMenuOpen(false)} />
          ) : (
            <Icon as={Menu} onClick={() => setIsMenuOpen(true)} />
          )
        }
        menuOptions={menuOptions}
      >
        <CardsWrapper>
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
        </CardsWrapper>
      </Screen>
    </ThemeProvider>
  )
}

const CardsWrapper = styled.div`
  position: relative;
`

const Header = styled.div`
  margin: 15px;
  font-size: 2.2em;
  font-weight: bold;
`
const Footer = styled.div`
  margin: 20px;
  font-size: 1.2em;
  font-weight: bold;
`
const Icon = styled.svg`
  width: 35px;
  font-weight: 700;
`

const MenuOption = styled.div`
  margin: 5px;
  font-weight: 700;
  cursor: pointer;
  font-size: 1.2em;
`
