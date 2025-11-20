// src/components/JobListings.jsx
import React, { useState } from 'react'

export function JobListings({ jobs = [] }) {
  if (!Array.isArray(jobs) || jobs.length === 0) {
    return (
      <section aria-live="polite" className="job-empty">
        <p>No se encontraron resultados</p>
      </section>
    )
  }

  return (
    <section className="jobs-listings" aria-label="Resultado de búsqueda">
      <h2>Resultado de búsqueda</h2>
      <ul className="jobs-list" role="list">
        {jobs.map((job, index) => (
          <li key={stableKey(job, index)} role="listitem">
            <JobCard job={job} />
          </li>
        ))}
      </ul>
    </section>
  )
}

function stableKey(job, index) {
  // Prefiere id, luego combinación título+empresa, finalmente índice
  if (job?.id) return String(job.id)
  if (job?.titulo || job?.title) {
    const t = (job.titulo || job.title).toString().slice(0, 40).replace(/\s+/g, '-').toLowerCase()
    const c = (job.empresa || job.company || '').toString().slice(0, 20).replace(/\s+/g, '-').toLowerCase()
    return `${t}-${c}` || `job-${index}`
  }
  return `job-${index}`
}

function JobCard({ job }) {
  const [applied, setApplied] = useState(false)

  const idBase = job?.id ? `job-${job.id}` : `job-${Math.random().toString(36).slice(2, 9)}`
  const title = String(job?.titulo || job?.title || 'Oferta sin título')
  const company = String(job?.empresa || job?.company || job?.data?.empresa || '')
  const longDescription = String(job?.descripcionLarga || job?.descripcion || job?.descripcion_corta || job?.resumen || '')
  const tech = String(job?.data?.technology || job?.data?.tecnologias || '')
  const mode = String(job?.data?.modalidad || job?.data?.location || '')

  const handleApply = () => setApplied((v) => !v)

  return (
    <article
      className="job-card"
      data-technology={tech}
      data-location={mode}
      data-nivel={String(job?.data?.nivel || '')}
      aria-labelledby={`${idBase}-title`}
    >
      <div className="job-header">
        <h3 id={`${idBase}-title`}>{title}</h3>
        <button
          className={`button-apply-job ${applied ? 'applied' : ''}`}
          onClick={handleApply}
          aria-pressed={applied}
          aria-label={applied ? `Marcar como no aplicado a ${title}` : `Aplicar a ${title}`}
        >
          {applied ? 'Aplicado' : 'Aplicar'}
        </button>
      </div>

      {company && <p className="job-meta">{company}</p>}

      {tech && (
        <p className="job-tech" aria-hidden="false">
          <strong>Tecnologías:</strong> {tech}
        </p>
      )}

      {longDescription ? (
        <p className="job-description">{longDescription}</p>
      ) : (
        <p className="job-description muted">Sin descripción disponible</p>
      )}
    </article>
  )
}
