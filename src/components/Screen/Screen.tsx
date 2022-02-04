import React from 'react'
import styled from 'styled-components'
import { useWindowDimensions } from '../../hooks'

export const Screen:React.FC<React.HTMLAttributes<HTMLDivElement>>=({children,...props})=>{
    const {windowWidth,windowHeight}=useWindowDimensions()
    return <ScreenBox width={windowWidth} height={windowHeight} {...props}>{children}</ScreenBox>
}

const ScreenBox=styled.div<{width:number;height:number}>`
border:1px solid red;
box-sizing:border-box;
width:${({width})=>width}px;
height:${({height})=>height}px;
`