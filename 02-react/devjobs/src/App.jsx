import Header from './components/Header'
import Footer from './components/Footer'
import JobCard from './components/JobCard'

function App() {
 const jobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'TechCorp',
    location: 'Madrid, España',
    salary: '45,000 - 60,000 EUR',
    description: 'Estamos buscando un desarrollador frontend con experiencia en React',
    tags: ['React', 'TypeScript', 'CSS']
  },
  {
    id: 2,
    title: 'Backend Developer',
    company: 'DataStack',
    location: 'Barcelona, España',
    salary: '50,000 - 70,000 EUR',
    description: 'Desarrollador backend para trabajar con Node,js y base de datos',
    tags: ['Node,js', 'PostgreSQL', 'API']
  },
  {
      id: 3,
      title: 'Full Stack Developer',
      company: 'StartupX',
      location: 'Valencia, España',
      salary: '€40,000 - €55,000',
      description: 'Buscan un desarrollador salvavidas que pueda hacer de todo.',
      tags: ['React', 'Node.js', 'MongoDB'],
    },
 ]

 return (
  <div className='app'>
    <Header />
    <main>
      <h1>Trabajos Disponibles</h1>
    <section className='jobs-container'>
      <div className='jobs-grid'>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
    </main>
    <Footer />
  </div>
 )
}

export default App
