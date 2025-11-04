// src/components/JobListings.jsx
import React, { useState } from 'react'

export function JobListings({ jobs = [] }) {
  if (!jobs || jobs.length === 0) {
    return <div className="job-empty">No se encontraron resultados</div>
  }

  return (
    <section className="jobs-listings" aria-live="polite">
      <h2>Resultado de búsqueda</h2>
      {jobs.map((job) => (
        <JobCard key={job.id || job.titulo} job={job} />
      ))}
    </section>
  )
}

function JobCard({ job }) {
  // Estado local para "aplicado"
  const [applied, setApplied] = useState(false)

  // Datos según tu jobs.json. Ajusta si los nombres difieren.
  const title = job.titulo || job.title || 'Oferta';
  const companyLine = job.empresa || job.company || `${job.data?.empresa || ''} | ${job.data?.modalidad || ''}`;
  // descripción más extensa — intenta buscar job.descripcionLarga o fallback a job.descripcion
  const longDescription = job.descripcionLarga || job.descripcion || job.descripcion_corta || job.resumen || '';

  // para mostrar tecnologías: asumimos job.data.technology puede ser "javascript,react"
  const tech = job.data?.technology || job.data?.tecnologias || ''

  const handleApply = () => {
    setApplied((v) => !v)
  }

  return (
    <article className="job-card" data-technology={tech} data-location={job.data?.modalidad} data-contract={job.data?.contrato} data-nivel={job.data?.nivel}>
      <div className="job-header">
        <h3>{title}</h3>
        <button
          className={`button-apply-job ${applied ? 'applied' : ''}`}
          onClick={handleApply}
          aria-pressed={applied}
        >
          {applied ? 'Aplicado' : 'Aplicar'}
        </button>
      </div>

      <h6 className="job-meta">{companyLine}</h6>

      <p className="job-description">{longDescription}</p>
    </article>
  )
}
