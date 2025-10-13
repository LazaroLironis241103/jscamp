// Espera a que todo el DOM se cargue antes de ejecutar
document.addEventListener('DOMContentLoaded', () => {

  // Botones "Aplicar" dentro de la sección de jobs
  const jobsListingSection = document.querySelector('.jobs-listings')

  if (jobsListingSection) {
    jobsListingSection.addEventListener('click', function(event) {
      const element = event.target
      if (element.classList.contains('button-apply-job')) {
        element.textContent = '¡Aplicado!'
        element.classList.add('is-applied')
        element.disabled = true
      }
    })
  } else {
    console.warn("No se encontró .jobs-listings")
  }

  // Selector de tecnología
  const filter = document.querySelector('#filter-technology')
  if (filter) {
    filter.addEventListener('change', function () {
      console.log('Filtro tecnología:', filter.value)
    })
  } else {
    console.warn("No se encontró #filter-technology")
  }

  // Opcional: agregar más selectores o filtros siguiendo la misma lógica
})
