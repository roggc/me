import React from 'react'
import { render, screen } from '@testing-library/react'
import { App } from '.'

it('renders hey', () => {
  render(<App />)
  expect(screen.getByText('hey')).toBeInTheDocument()
})
