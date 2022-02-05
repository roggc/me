import React, { useState } from 'react'
import styled from 'styled-components'
import { useWindowDimensions } from '../../hooks'

interface IScreenProps extends React.HTMLAttributes<HTMLDivElement> {
  header: React.ReactNode
  footer: React.ReactNode
  menu: React.ReactNode
  menuOptions: React.ReactNode[]
}

export const Screen: React.FC<IScreenProps> = ({
  header,
  footer,
  menu,
  menuOptions,
  children,
  ...props
}) => {
  const { windowWidth, windowHeight } = useWindowDimensions()
  const [isHidden, setIsHidden] = useState(true)
  return (
    <ScreenBox width={windowWidth} height={windowHeight} {...props}>
      <MenuWrapper onClick={() => setIsHidden((prev) => !prev)}>
        {menu}
      </MenuWrapper>
      <MenuScreen height={windowHeight} width={225} isHidden={isHidden}>
        {menuOptions}
      </MenuScreen>
      {header}
      {children}
      {footer}
    </ScreenBox>
  )
}

const ScreenBox = styled.div<{ width: number; height: number }>`
  border: 1px solid red;
  box-sizing: border-box;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
`

const MenuWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
  z-index: 2;
`

const MenuScreen = styled.div<{
  width: number
  height: number
  isHidden: boolean
}>`
  position: absolute;
  top: 0;
  left: ${({ isHidden, width }) => `${isHidden ? `${-(width + 1)}px` : '0'}`};
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: ${({ theme }) => theme.backgroundColor};
  z-index: 1;
  transition: left 1s;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-top: 60px;
  padding-left: 25px;
`
