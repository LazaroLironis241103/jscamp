// src/components/JobListings.jsx
export function JobListings({ jobs = [] }) {
  return (
    <section className="jobs-listings" aria-live="polite">
      <h2>Resultado de búsqueda</h2>

      {jobs.length === 0 ? (
        <p className="job-empty">No se encontraron trabajos.</p>
      ) : (
        jobs.map((job) => (
          <article
            key={job.id}
            data-technology={Array.isArray(job.data?.technology) ? job.data.technology.join(',') : job.data?.technology}
            data-location={job.data?.modalidad || ''}
            data-contract={job.data?.contract || job.data?.tipo || ''}
            data-nivel={job.data?.nivel || ''}
          >
            <div className="job-header">
              <h3>{job.titulo}</h3>
              <button className="button-apply-job" type="button">Aplicar</button>
            </div>

            <h6>{job.empresa ? job.empresa : 'Empresa desconocida'} {job.data?.modalidad ? `| ${job.data.modalidad}` : ''}</h6>

            <p>{job.descripcion}</p>
          </article>
        ))
      )}
    </section>
  )
}
