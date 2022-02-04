import React from 'react'
import styled from 'styled-components'

interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number
}

export const Card = React.forwardRef<HTMLDivElement, ICardProps>(
  ({ width, children, ...props }, ref) => (
    <CardBox {...props} width={width} ref={ref}>
      {children}
    </CardBox>
  )
)

const CardBox = styled.div<{ width?: number }>`
  border-radius: ${({ theme }) => theme.borderRadius}px;
  background-color: ${({ theme }) => theme.backgroundColor};
  padding: ${({ theme }) => theme.padding}px;
  margin: ${({ theme }) => theme.margin}px;
  ${({ width }) => `
  ${width !== undefined ? `width:${width}px` : ''}
  `}
`
