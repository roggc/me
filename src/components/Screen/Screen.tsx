import React from 'react'
import styled from 'styled-components'
import { useWindowDimensions } from '../../hooks'

interface IScreenProps extends React.HTMLAttributes<HTMLDivElement>{
    header:React.ReactNode
    footer:React.ReactNode
}

export const Screen:React.FC<IScreenProps>=({header,footer,children,...props})=>{
    const {windowWidth,windowHeight}=useWindowDimensions()
    return <ScreenBox width={windowWidth} height={windowHeight} {...props}>
        {header}
        {children}
        {footer}
        </ScreenBox>
}

const ScreenBox=styled.div<{width:number;height:number}>`
border:1px solid red;
box-sizing:border-box;
width:${({width})=>width}px;
height:${({height})=>height}px;
display:flex;
flex-direction:column;
justify-content:space-between;
align-items:center;
`