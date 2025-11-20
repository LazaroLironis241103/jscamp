// src/App.jsx
import { useState, useMemo, useEffect } from 'react'
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
    salary: '',
    contractType: '',
  })

  const [textToFilter, setTextToFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const handleSearch = (newFilters) => {
    setFilters({
      technology: newFilters.technology || '',
      location: newFilters.location || '',
      experienceLevel: newFilters.experienceLevel || '',
      salary: newFilters.salary || '',
      contractType: newFilters.contractType || '',
    })
    setTextToFilter(newFilters.search || '')
    setCurrentPage(1)
  }

  const handleChangeText = (text) => {
    setTextToFilter(text)
    setCurrentPage(1)
  }

  const handleReset = () => {
    setFilters({
      technology: '',
      location: '',
      experienceLevel: '',
      salary: '',
      contractType: '',
    })
    setTextToFilter('')
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const normalize = (value) => (value ?? '').toString().toLowerCase()

  const jobsFilteredByFilters = useMemo(() => {
    const techFilter = (filters.technology || '').toLowerCase()
    const locFilter = (filters.location || '').toLowerCase()
    const nivelFilter = (filters.experienceLevel || '').toLowerCase()
    const salaryFilter = filters.salary ? parseInt(filters.salary, 10) : 0
    const contractFilter = (filters.contractType || '').toLowerCase()

    return jobsData.filter((job) => {
      const jobTechString = normalize(job.data?.technology || job.data?.tecnologias)
      const jobMode = normalize(job.data?.modalidad || job.data?.location)
      const jobNivel = normalize(job.data?.nivel)
      const jobSalary = parseInt(job.data?.salary || job.data?.salario || 0, 10) || 0
      const jobContract = normalize(job.data?.contractType || job.data?.contrato || '')

      const techMatch =
        !techFilter ||
        jobTechString.split(',').map((s) => s.trim()).includes(techFilter)
      const locationMatch = !locFilter || jobMode.includes(locFilter)
      const nivelMatch = !nivelFilter || jobNivel.includes(nivelFilter)
      const salaryMatch = !salaryFilter || jobSalary >= salaryFilter
      const contractMatch = !contractFilter || jobContract === contractFilter

      return techMatch && locationMatch && nivelMatch && salaryMatch && contractMatch
    })
  }, [filters])

  const jobsWithTextFilter = useMemo(() => {
    if (!textToFilter) return jobsFilteredByFilters
    const q = textToFilter.toLowerCase()
    return jobsFilteredByFilters.filter((job) => {
      const title = normalize(job.titulo)
      const description = normalize(job.descripcion)
      const company = normalize(job.empresa || job.company)
      return title.includes(q) || description.includes(q) || company.includes(q)
    })
  }, [jobsFilteredByFilters, textToFilter])

  const totalResults = jobsWithTextFilter.length
  const totalPages = Math.max(1, Math.ceil(totalResults / RESULTS_PER_PAGE))

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1)
    }
  }, [currentPage, totalPages])

  const pagedResults = useMemo(() => {
    const start = (currentPage - 1) * RESULTS_PER_PAGE
    const end = currentPage * RESULTS_PER_PAGE
    return jobsWithTextFilter.slice(start, end)
  }, [jobsWithTextFilter, currentPage])

  return (
    <>
      <Header />
      <main className="layout">
        <section>
          <SearchForm onSearch={handleSearch} onChangeText={handleChangeText} onReset={handleReset} />
        </section>

        <div className="results-summary" aria-live="polite">
          <p>
            Se encontraron <strong>{totalResults}</strong> trabajos{' '}
            {textToFilter && (
              <>
                para "<em>{textToFilter}</em>"
              </>
            )}
          </p>
        </div>

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
