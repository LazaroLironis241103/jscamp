// src/components/SearchForm.jsx
import React, { useState, useEffect } from 'react'

export function SearchForm({ onSearch, onChangeText, initialFilters = {} }) {
  const [search, setSearch] = useState(initialFilters.search || '')
  const [technology, setTechnology] = useState(initialFilters.technology || '')
  const [location, setLocation] = useState(initialFilters.location || '')
  const [experienceLevel, setExperienceLevel] = useState(initialFilters.experienceLevel || '')

  useEffect(() => {
    if (typeof onChangeText === 'function') onChangeText(search)
  }, [search, onChangeText])

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = { technology, location, experienceLevel, search }
    if (typeof onSearch === 'function') onSearch(payload)
  }

  return (
    <section className="jobs-search" aria-labelledby="search-heading">
      <h1 id="search-heading">Encuentra tu próximo trabajo</h1>
      <p>Explora miles de oportunidades en el sector tecnológico.</p>

      <form role="search" onSubmit={handleSubmit} className="search-form" aria-label="Buscar empleos">
        <div className="search-bar">
          {/* Lupa SVG */}
          <svg className="icon-search" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
            <circle cx="11" cy="11" r="7"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>

          <input
            type="text"
            id="buscador"
            name="search"
            value={search}
            placeholder="Buscar trabajos, empresas o habilidades"
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Buscar trabajos, empresas o habilidades"
          />

          {/* Contador (si no lo quieres visible, coméntalo o elimínalo) */}
          <div id="contador" aria-live="polite" className="contador">
            {search.length}
          </div>

          {/* Botón Buscar a la derecha dentro de la barra */}
          <button type="submit" className="btn-search" aria-label="Buscar trabajos">Buscar</button>
        </div>

        <div className="search-filters">
          <select name="technology" id="filter-technology" value={technology} onChange={(e) => setTechnology(e.target.value)} aria-label="Filtrar por tecnología">
            <option value="">Tecnología</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="react">React</option>
            <option value="nodejs">Node.js</option>
          </select>

          <select name="location" id="location" value={location} onChange={(e) => setLocation(e.target.value)} aria-label="Filtrar por ubicación">
            <option value="">Ubicación</option>
            <option value="remoto">Remoto</option>
            <option value="bsas">Buenos Aires</option>
            <option value="cordoba">Cordoba</option>
            <option value="barcelona">Barcelona</option>
          </select>

          <select name="experienceLevel" id="experience-level" value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)} aria-label="Filtrar por nivel de experiencia">
            <option value="">Nivel de experiencia</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid-level</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
          </select>
        </div>
      </form>
    </section>
  )
}
