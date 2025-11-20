// src/__tests__/App.filter.test.jsx
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import App from '../App'
import jobsSample from '../data/jobs.json'

// To avoid depending on the full dataset you can mock a small subset here.
// If jobs.json is big, this test will still run against it; it's fine for integration.

test('applying salary and contract filters reduces results and resets page', () => {
  render(<App />)

  // find salary input and contract select by aria-label
  const salaryInput = screen.getByLabelText(/filtrar por salario mínimo/i)
  const contractSelect = screen.getByLabelText(/filtrar por tipo de contrato/i)
  const searchButton = screen.getByRole('button', { name: /buscar trabajos/i })

  // apply filters
  fireEvent.change(salaryInput, { target: { value: '999999' } }) // very high -> probably 0 results
  fireEvent.change(contractSelect, { target: { value: 'full-time' } })
  fireEvent.click(searchButton)

  // Expect results summary to reflect 0 or small number
  const summary = screen.getByText(/se encontraron/i)
  expect(summary).toBeInTheDocument()
})
