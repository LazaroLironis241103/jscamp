function JobCard({ job }) {
  const { title, company, location, salary, description, tags } = job

  return (
    <article className="job-card">
      <header>
        <h3>{title}</h3>
        <p>{company}</p>
      </header>
      <div>
        <p>📍 {location}</p>
        <p>💰 {salary}</p>
        <p>{description}</p>
      </div>
      <footer>
        <span>{tags.join(', ')}</span>
        <button>Aplicar</button>
      </footer>
    </article>
  )
}

export default JobCard
