// src/__tests__/SearchForm.test.jsx
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { SearchForm } from '../components/SearchForm'

test('onSearch is called with FormData values on submit', () => {
  const onSearch = vi.fn()
  render(<SearchForm onSearch={onSearch} onChangeText={() => {}} />)

  const input = screen.getByPlaceholderText(/buscar trabajos, empresas o habilidades/i)
  fireEvent.change(input, { target: { value: 'react' } })

  const techSelect = screen.getByLabelText(/filtrar por tecnología/i)
  fireEvent.change(techSelect, { target: { value: 'react' } })

  const salaryInput = screen.getByLabelText(/filtrar por salario mínimo/i)
  fireEvent.change(salaryInput, { target: { value: '50000' } })

  const contractSelect = screen.getByLabelText(/filtrar por tipo de contrato/i)
  fireEvent.change(contractSelect, { target: { value: 'full-time' } })

  // submit form by clicking Buscar
  const btn = screen.getByRole('button', { name: /buscar trabajos/i })
  fireEvent.click(btn)

  expect(onSearch).toHaveBeenCalled()
  const arg = onSearch.mock.calls[0][0]
  expect(arg.search).toBe('react')
  expect(arg.technology).toBe('react')
  expect(arg.salary).toBe('50000')
  expect(arg.contractType).toBe('full-time')
})

test('onChangeText is called on typing', () => {
  const onChangeText = vi.fn()
  render(<SearchForm onSearch={() => {}} onChangeText={onChangeText} />)
  const input = screen.getByPlaceholderText(/buscar trabajos, empresas o habilidades/i)
  fireEvent.change(input, { target: { value: 'node' } })
  expect(onChangeText).toHaveBeenCalledWith('node')
})

test('clicking Limpiar filtros calls onReset and clears fields', () => {
  const onReset = vi.fn()
  render(<SearchForm onSearch={() => {}} onChangeText={() => {}} onReset={onReset} />)
  const input = screen.getByPlaceholderText(/buscar trabajos, empresas o habilidades/i)
  fireEvent.change(input, { target: { value: 'react' } })
  const resetBtn = screen.getByRole('button', { name: /limpiar filtros/i })
  fireEvent.click(resetBtn)
  expect(onReset).toHaveBeenCalled()
  expect(input.value).toBe('')
})
