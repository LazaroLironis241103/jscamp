import { JobCard } from './JobCard'

export function JobList({ jobs }) {
  return (
    <section className="jobs-container">
      <div className="jobs-grid">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  )
}
