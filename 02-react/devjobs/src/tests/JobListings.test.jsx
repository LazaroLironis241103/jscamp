// src/__tests__/JobListings.test.jsx
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { JobListings } from '../components/JobListings'

test('renders fallback when jobs empty', () => {
  render(<JobListings jobs={[]} />)
  expect(screen.getByText(/no se encontraron resultados/i)).toBeInTheDocument()
})

test('apply button toggles aria-pressed', () => {
  const jobs = [{ id: '1', titulo: 'Dev', empresa: 'X', descripcion: 'desc', data: {} }]
  render(<JobListings jobs={jobs} />)
  const btn = screen.getByRole('button', { name: /aplicar a dev/i })
  expect(btn).toHaveAttribute('aria-pressed', 'false')
  fireEvent.click(btn)
  expect(btn).toHaveAttribute('aria-pressed', 'true')
})
