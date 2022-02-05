import React, { useState, useMemo, useCallback } from 'react'
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
import { User } from '@styled-icons/boxicons-solid/User'
import { Gmail } from '@styled-icons/simple-icons/Gmail'
import { Github } from '@styled-icons/boxicons-logos/Github'
import { Linkedin } from '@styled-icons/boxicons-logos/Linkedin'
import { Article } from '@styled-icons/material-rounded/Article'
import logo from '../../resources/logo.svg'
import { Like } from '@styled-icons/boxicons-solid/Like'
import { EmojiHeartEyesFill } from '@styled-icons/bootstrap/EmojiHeartEyesFill'
import { Search } from '@styled-icons/evaicons-solid/Search'
import { TelephoneFill } from '@styled-icons/bootstrap/TelephoneFill'

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

const SuperSmallIcon = styled.svg`
  width: 20px;
  font-weight: 700;
  margin: 5px;
`

type Keys = 'hobbies' | 'contact info' | 'looking for' | 'tech skills'
const KEYS: Keys[] = ['hobbies', 'contact info', 'looking for', 'tech skills']
const IconsKeys = [
  <SuperSmallIcon as={EmojiHeartEyesFill} />,
  <SuperSmallIcon as={TelephoneFill} />,
  <SuperSmallIcon as={Search} />,
  <SuperSmallIcon as={Like} />,
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
  const { widths, heights, refs } = useGetWidthsAndHeights(
    isActivateChange,
    setIsActivateChange,
    lotties.length
  )
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [key, setKey] = useState<Keys>(KEYS[0])

  const reorderLotties = useCallback(() => {
    setLotties((prev) => {
      const reordered = prev.slice(1)
      reordered.push(prev[0])
      return reordered
    })
    setIsActivateChange(true)
  }, [])

  const menuOptions = useMemo(
    () =>
      KEYS.map((key_, index) => (
        <MenuOption
          key={key_}
          onClick={() => setKey(key_)}
          isSelected={key_ === key}
        >
          {IconsKeys[index]}
          {key_}
        </MenuOption>
      )),
    [key]
  )

  const header = useMemo(() => {
    switch (key) {
      case KEYS[0]:
        return <Header>Some things I like</Header>
      case KEYS[1]:
        return <Header>Contact Information</Header>
      case KEYS[2]:
        return <Header>React and React Native dev role</Header>
      case KEYS[3]:
        return <Header>Things I know in tech</Header>
    }
  }, [key])

  const footer = useMemo(() => {
    switch (key) {
      case KEYS[0]:
        return lotties[lotties.length - 1].footer
      case KEYS[1]:
        return <Footer>2022</Footer>
      case KEYS[2]:
        return <Footer>Contact Me!</Footer>
      case KEYS[3]:
        return <Footer>2022</Footer>
    }
  }, [key, lotties])

  const children = useMemo(() => {
    switch (key) {
      case KEYS[0]:
        return (
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
        )
      case KEYS[1]:
        return (
          <ContactInfoCard>
            <Line>
              <Cell>
                <SmallIcon as={User} />
              </Cell>
              <Cell>roger gomez</Cell>
            </Line>
            <Line>
              <Cell>
                <SmallIcon as={Gmail} />
              </Cell>
              <Cell>roggc9@gmail.com</Cell>
            </Line>
            <Line>
              <Cell>
                <SmallIcon as={Github} />
              </Cell>
              <Cell>
                <Anchor href="https://github.com/roggc">roggc</Anchor>
              </Cell>
            </Line>
            <Line>
              <Cell>
                <SmallIcon as={Linkedin} />
              </Cell>
              <Cell>
                <Anchor href="https://www.linkedin.com/in/roggc9">
                  roggc9
                </Anchor>
              </Cell>
            </Line>
            <Line>
              <Cell>
                <SmallIcon as={Article} />
              </Cell>
              <Cell>
                <Anchor href="https://dev.to/roggc">roggc</Anchor>
              </Cell>
            </Line>
          </ContactInfoCard>
        )
      case KEYS[2]:
        return (
          <LogoCard>
            <Logo src={logo} />
          </LogoCard>
        )
      case KEYS[3]:
        return (
          <TechSkillsCard>
            <Cell>React (Hooks)</Cell>
            <LineRight>
              <Cell>7/10</Cell>
            </LineRight>
            <Cell>React Native</Cell>
            <LineRight>
              <Cell>6.5/10</Cell>
            </LineRight>
            <Cell>Typescript</Cell>
            <LineRight>
              <Cell>6/10</Cell>
            </LineRight>
            <Cell>Unit Tests</Cell>
            <LineRight>
              <Cell>4/10</Cell>
            </LineRight>
            <Cell>Styled Components</Cell>
            <LineRight>
              <Cell>7/10</Cell>
            </LineRight>
            <Cell>Vue</Cell>
            <LineRight>
              <Cell>6/10</Cell>
            </LineRight>
          </TechSkillsCard>
        )
    }
  }, [key, lotties, reorderLotties, heights, widths, refs])

  return (
    <ThemeProvider theme={myTheme}>
      <Screen
        header={header}
        footer={footer}
        menu={
          isMenuOpen ? (
            <Icon as={Cross} onClick={() => setIsMenuOpen(false)} />
          ) : (
            <Icon as={Menu} onClick={() => setIsMenuOpen(true)} />
          )
        }
        menuOptions={menuOptions}
      >
        {children}
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

const SmallIcon = styled.svg`
  width: 30px;
  font-weight: 700;
`

const MenuOption = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  margin: 5px;
  font-weight: 700;
  cursor: pointer;
  font-size: 1.2em;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  width: fit-content;
  padding: ${({ theme }) => theme.padding}px;
  ${({ isSelected, theme }) => `
  ${
    isSelected
      ? `
  background-color:red;
  color:${theme.backgroundColor};
  `
      : ''
  }
  `}
`

const ContactInfoCard = styled(C)`
  --display: grid;
  --grid-template-columns: repeat(2, 1fr);
`

const Cell = styled.div`
  font-weight: 700;
  font-size: 1.2em;
  margin: 5px;
`

const Line = styled.div`
  display: flex;
  align-items: center;
`

const Anchor = styled.a`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

const LogoCard = styled(C)``

const Logo = styled.img`
  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  animation: App-logo-spin infinite 20s linear;
  pointer-events: none;
  height: 40vmin;
`

const TechSkillsCard = styled(C)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`

const LineRight = styled.div`
  display: flex;
  justify-content: flex-end;
`
