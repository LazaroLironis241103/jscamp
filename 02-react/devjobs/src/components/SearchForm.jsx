// src/components/SearchForm.jsx
import { useId } from 'react'

export function SearchForm({ onSearch, onChangeText }) {
  const idText = useId()
  const idTechnology = useId()
  const idLocation = useId()
  const idContractType = useId()
  const idExperienceLevel = useId()

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)

    const filters = {
      search: formData.get(idText) || '',
      technology: formData.get(idTechnology) || '',
      location: formData.get(idLocation) || '',
      contractType: formData.get(idContractType) || '',
      experienceLevel: formData.get(idExperienceLevel) || '',
    }

    onSearch(filters)
  }

  const handleChangeText = (event) => {
    onChangeText(event.target.value)
  }

  return (
    <section className="jobs-search" aria-labelledby={`${idText}-title`}>
      <h1 id={`${idText}-title`}>Encuentra tu próximo trabajo</h1>
      <p>Explora miles de oportunidades en el sector tecnológico.</p>

      <form role="search" onSubmit={handleSubmit} aria-label="Formulario de búsqueda de empleos">
        <div className="search-bar">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-search" aria-hidden="true">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>

          <input
            required
            type="text"
            name={idText}
            id={idText}
            placeholder="Buscar trabajos, empresas o habilidades"
            onChange={handleChangeText}
            aria-label="Buscar trabajos"
          />
          <div id="contador" aria-hidden="true"></div>
        </div>

        <div className="search-filters" role="group" aria-label="Filtros de búsqueda">
          <select name={idTechnology} id={idTechnology} aria-label="Filtrar por tecnología">
            <option value="">Tecnología</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="react">React</option>
            <option value="nodejs">Node.js</option>
          </select>

          <select name={idLocation} id={idLocation} aria-label="Filtrar por ubicación">
            <option value="">Ubicación</option>
            <option value="remoto">Remoto</option>
            <option value="bsas">Buenos Aires</option>
            <option value="cordoba">Córdoba</option>
            <option value="barcelona">Barcelona</option>
          </select>

          <select name={idContractType} id={idContractType} aria-label="Filtrar por tipo de contrato">
            <option value="">Tipo de contrato</option>
            <option value="tiempo-completo">Tiempo completo</option>
            <option value="medio-tiempo">Medio tiempo</option>
            <option value="freelance">Freelance</option>
            <option value="pasantia">Pasantía</option>
          </select>

          <select name={idExperienceLevel} id={idExperienceLevel} aria-label="Filtrar por nivel de experiencia">
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
