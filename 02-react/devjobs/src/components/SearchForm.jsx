// src/components/SearchForm.jsx
import React, { useId, useState } from 'react'

export function SearchForm({ onSearch, onChangeText, onReset, initialFilters = {} }) {
  const idBase = useId()
  const idSearch = `${idBase}-search`
  const idTechnology = `${idBase}-technology`
  const idLocation = `${idBase}-location`
  const idExperience = `${idBase}-experience`
  const idSalary = `${idBase}-salary`
  const idContract = `${idBase}-contract`

  const [search, setSearch] = useState(initialFilters.search || '')
  const [technology, setTechnology] = useState(initialFilters.technology || '')
  const [location, setLocation] = useState(initialFilters.location || '')
  const [experienceLevel, setExperienceLevel] = useState(initialFilters.experienceLevel || '')
  const [focusedField, setFocusedField] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const filters = {
      search: formData.get(idSearch) || '',
      technology: formData.get(idTechnology) || '',
      location: formData.get(idLocation) || '',
      experienceLevel: formData.get(idExperience) || '',
      salary: formData.get(idSalary) || '',
      contractType: formData.get(idContract) || '',
    }
    if (typeof onSearch === 'function') onSearch(filters)
  }

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearch(value)
    if (typeof onChangeText === 'function') onChangeText(value)
  }

  const handleReset = (e) => {
    const form = e.target.closest('form')
    form?.reset()
    setSearch('')
    setTechnology('')
    setLocation('')
    setExperienceLevel('')
    setFocusedField(null)
    if (typeof onChangeText === 'function') onChangeText('')
    if (typeof onReset === 'function') onReset()
  }

  return (
    <section className="jobs-search" aria-labelledby="search-heading">
      <h1 id="search-heading">Encuentra tu próximo trabajo</h1>
      <p>Explora miles de oportunidades en el sector tecnológico.</p>

      <form
        role="search"
        onSubmit={handleSubmit}
        className="search-form"
        aria-label="Buscar empleos"
      >
        <div className="search-bar">
          <svg
            className="icon-search"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <circle cx="11" cy="11" r="7"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>

          <label htmlFor={idSearch} className="visually-hidden">Buscar</label>
          <input
            type="text"
            id={idSearch}
            name={idSearch}
            value={search}
            placeholder="Buscar trabajos, empresas o habilidades"
            onChange={handleSearchChange}
            onFocus={() => setFocusedField('search')}
            onBlur={() => setFocusedField(null)}
            aria-label="Buscar trabajos, empresas o habilidades"
            className={focusedField === 'search' ? 'input-focused' : ''}
          />

          <div id="contador" aria-live="polite" className="contador">
            {search.length}
          </div>

          <button type="submit" className="btn-search" aria-label="Buscar trabajos">Buscar</button>
        </div>

        <div className="search-filters">
          <label htmlFor={idTechnology} className="visually-hidden">Tecnología</label>
          <select
            name={idTechnology}
            id={idTechnology}
            value={technology}
            onChange={(e) => setTechnology(e.target.value)}
            onFocus={() => setFocusedField('technology')}
            onBlur={() => setFocusedField(null)}
            aria-label="Filtrar por tecnología"
            className={focusedField === 'technology' ? 'input-focused' : ''}
          >
            <option value="">Tecnología</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="react">React</option>
            <option value="nodejs">Node.js</option>
          </select>

          <label htmlFor={idLocation} className="visually-hidden">Ubicación</label>
          <select
            name={idLocation}
            id={idLocation}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={() => setFocusedField('location')}
            onBlur={() => setFocusedField(null)}
            aria-label="Filtrar por ubicación"
            className={focusedField === 'location' ? 'input-focused' : ''}
          >
            <option value="">Ubicación</option>
            <option value="remoto">Remoto</option>
            <option value="bsas">Buenos Aires</option>
            <option value="cordoba">Cordoba</option>
            <option value="barcelona">Barcelona</option>
          </select>

          <label htmlFor={idExperience} className="visually-hidden">Nivel de experiencia</label>
          <select
            name={idExperience}
            id={idExperience}
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            onFocus={() => setFocusedField('experience')}
            onBlur={() => setFocusedField(null)}
            aria-label="Filtrar por nivel de experiencia"
            className={focusedField === 'experience' ? 'input-focused' : ''}
          >
            <option value="">Nivel de experiencia</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid-level</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
          </select>

          <label htmlFor={idSalary} className="visually-hidden">Salario mínimo</label>
          <input
            type="number"
            id={idSalary}
            name={idSalary}
            min="0"
            step="1000"
            placeholder="Salario mínimo"
            aria-label="Filtrar por salario mínimo"
            onFocus={() => setFocusedField('salary')}
            onBlur={() => setFocusedField(null)}
            className={focusedField === 'salary' ? 'input-focused' : ''}
          />

          <label htmlFor={idContract} className="visually-hidden">Tipo de contrato</label>
          <select
            id={idContract}
            name={idContract}
            aria-label="Filtrar por tipo de contrato"
            onFocus={() => setFocusedField('contract')}
            onBlur={() => setFocusedField(null)}
            className={focusedField === 'contract' ? 'input-focused' : ''}
          >
            <option value="">Tipo de contrato</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="freelance">Freelance</option>
            <option value="internship">Prácticas</option>
          </select>
        </div>

        <div className="search-actions">
          <button type="button" className="btn-reset" onClick={handleReset}>Limpiar filtros</button>
        </div>
      </form>
    </section>
  )
}
