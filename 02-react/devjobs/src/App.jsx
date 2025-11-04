// src/App.jsx
import { useState } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { SearchForm } from './components/SearchForm'
import { JobListings } from './components/JobListings'
import { Pagination } from './components/Pagination'
import jobsData from './data/jobs.json'

const RESULTS_PER_PAGE = 5

function App() {
  const [filters, setFilters] = useState({
    technology: '',
    location: '',
    experienceLevel: '',
  })

  const [textToFilter, setTextToFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const handleSearch = (newFilters) => {
    setFilters({
      technology: newFilters.technology,
      location: newFilters.location,
      experienceLevel: newFilters.experienceLevel,
    })
    setTextToFilter(newFilters.search)
    setCurrentPage(1)
  }

  const handleChangeText = (text) => {
    setTextToFilter(text)
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const jobsFilteredByFilters = jobsData.filter((job) => {
  // normalizamos valores a minúsculas para comparar
  const jobTechString = (job.data?.technology || job.data?.tecnologias || '').toString().toLowerCase()
  const jobMode = (job.data?.modalidad || job.data?.location || '').toString().toLowerCase()
  const jobNivel = (job.data?.nivel || '').toString().toLowerCase()

  const techMatch = !filters.technology || jobTechString.split(',').map(s => s.trim()).includes(filters.technology.toLowerCase())
  const locationMatch = !filters.location || jobMode.includes(filters.location.toLowerCase())
  const nivelMatch = !filters.experienceLevel || jobNivel.includes(filters.experienceLevel.toLowerCase())

  return techMatch && locationMatch && nivelMatch
})


  // Filtrar por texto
  const jobsWithTextFilter =
    textToFilter === ''
      ? jobsFilteredByFilters
      : jobsFilteredByFilters.filter((job) =>
          job.titulo.toLowerCase().includes(textToFilter.toLowerCase())
        )

  // Paginación
  const totalPages = Math.max(1, Math.ceil(jobsWithTextFilter.length / RESULTS_PER_PAGE))

  const pagedResults = jobsWithTextFilter.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  )

  return (
    <>
      <Header />
      <main className="layout">
        <section>
          <SearchForm onSearch={handleSearch} onChangeText={handleChangeText} />
        </section>

        <JobListings jobs={pagedResults} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
      <Footer />
    </>
  )
}

export default App
