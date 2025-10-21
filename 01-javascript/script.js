// ../01-javascript/script.js
document.addEventListener('DOMContentLoaded', () => {
  const jobsListingSection = document.querySelector('.jobs-listings');
  const jobsArticles = Array.from(jobsListingSection?.querySelectorAll('article') || []);
  const inputBuscador = document.getElementById('buscador');
  const selectExperience = document.getElementById('experience-level');
  const selectTech = document.getElementById('filter-technology');
  const selectLocation = document.getElementById('location');
  const selectContract = document.getElementById('contract-type');
  const contador = document.getElementById('contador');

  // Normaliza cadenas: quita diacríticos, trim y pasa a minúsculas
  function normalize(str = '') {
    return String(str)
      .normalize?.('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .trim()
      .toLowerCase() || String(str).toLowerCase().trim();
  }

  // Extrae y normaliza metadatos desde un article (usa dataset si existe, si no fallback a texto)
  function metaFromArticle(article) {
    const titleRaw = article.querySelector('.job-header h3')?.textContent || article.querySelector('h3')?.textContent || '';
    const companyLineRaw = article.querySelector('h6')?.textContent || '';
    const descriptionRaw = article.querySelector('p')?.textContent || '';

    const technologyRaw = article.dataset.technology || ''; // ejemplo: "javascript,react,nodejs"
    const locationRaw = article.dataset.location || ''; // ejemplo: "remoto"
    const contractRaw = article.dataset.contract || ''; // ejemplo: "tiempo-completo"
    const experienceRaw = article.dataset.experience || article.dataset.nivel || ''; // ejemplo: "junior"

    return {
      title: normalize(titleRaw),
      companyLine: normalize(companyLineRaw),
      description: normalize(descriptionRaw),
      technologyRaw: normalize(technologyRaw),
      locationRaw: normalize(locationRaw),
      contractRaw: normalize(contractRaw),
      experienceRaw: normalize(experienceRaw)
    };
  }

  // Convierte data-technology (csv) a array normalizado
  function techsFromMeta(metaTechnology) {
    if (!metaTechnology) return [];
    return metaTechnology.split(',').map(t => normalize(t)).filter(Boolean);
  }

  // Mostrar/ocultar mensaje cuando no hay resultados
  function showNoResults(show) {
    if (!jobsListingSection) return;
    let msg = jobsListingSection.querySelector('.no-results');
    if (show) {
      if (!msg) {
        msg = document.createElement('p');
        msg.className = 'no-results';
        msg.textContent = 'No se encontraron resultados para esos filtros.';
        msg.style.color = 'var(--text-muted, #94a3b8)';
        msg.style.margin = '1rem 8rem';
        jobsListingSection.appendChild(msg);
      }
    } else {
      if (msg) msg.remove();
    }
  }

  // Función central de filtrado (combina buscador, nivel, tecnología, ubicación y contrato)
  function applyFilters() {
    const qTitle = normalize(inputBuscador?.value || '');
    const qExp = normalize(selectExperience?.value || '');
    const qLoc = normalize(selectLocation?.value || '');
    const qContract = normalize(selectContract?.value || '');
    const qTech = normalize(selectTech?.value || '');

    let visibleCount = 0;

    jobsArticles.forEach(article => {
      const meta = metaFromArticle(article);

      // Título
      const matchTitle = !qTitle || meta.title.includes(qTitle);

      // Experiencia: data exacta o fallback a búsqueda en texto
      const matchExp = !qExp ||
        (meta.experienceRaw && meta.experienceRaw === qExp) ||
        (!meta.experienceRaw && (meta.description + ' ' + meta.title + ' ' + meta.companyLine).includes(qExp));

      // Ubicación: data exacta o fallback en companyLine/description
      const matchLoc = !qLoc ||
        (meta.locationRaw && meta.locationRaw === qLoc) ||
        (!meta.locationRaw && (meta.companyLine + ' ' + meta.description).includes(qLoc));

      // Contrato: data exacta o fallback en texto
      const matchContract = !qContract ||
        (meta.contractRaw && meta.contractRaw === qContract) ||
        (!meta.contractRaw && (meta.description + ' ' + meta.title).includes(qContract));

      // Tecnología: si hay data-technology se compara en array; si no fallback a texto
      const articleTechs = techsFromMeta(meta.technologyRaw);
      const matchTech = !qTech ||
        (articleTechs.length && articleTechs.includes(qTech)) ||
        (!articleTechs.length && (meta.description + ' ' + meta.title + ' ' + meta.companyLine).includes(qTech));

      const visible = matchTitle && matchExp && matchLoc && matchContract && matchTech;

      article.style.display = visible ? '' : 'none';
      if (visible) visibleCount++;
    });

    if (contador) contador.textContent = `Mostrando ${visibleCount} de ${jobsArticles.length} ofertas`;
    showNoResults(visibleCount === 0);
  }

  // Delegación para botones "Aplicar"
  if (jobsListingSection) {
    jobsListingSection.addEventListener('click', (event) => {
      const btn = event.target.closest('.button-apply-job');
      if (!btn) return;
      btn.textContent = '¡Aplicado!';
      btn.classList.add('is-applied');
      btn.disabled = true;
    });
  }

  // Conectar listeners (input/change) a applyFilters
  if (inputBuscador) inputBuscador.addEventListener('input', applyFilters);
  if (selectExperience) selectExperience.addEventListener('change', applyFilters);
  if (selectTech) selectTech.addEventListener('change', applyFilters);
  if (selectLocation) selectLocation.addEventListener('change', applyFilters);
  if (selectContract) selectContract.addEventListener('change', applyFilters);

  // Aplicar filtros inicialmente
  applyFilters();
});

// Paginación dinámica
const RESULTS_PER_PAGE = 3;
let currentPage = 1;
const jobsArticles = Array.from(document.querySelectorAll('.jobs-listings article'));
const paginationContainer = document.querySelector('.pagination');

// Funcion para mostrar ofertas según la página actual
function mostrarOfertasPorPagina() {
  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
  const endIndex = startIndex + RESULTS_PER_PAGE;

  jobsArticles.forEach((job, index) => {
    job.style.display = (index >= startIndex && index < endIndex) ? '' : 'none';
  })
}

// Función para crear botones de paginación
function generarPaginacion() {
  const totalPages = Math.ceil(jobsArticles.length / RESULTS_PER_PAGE);
  paginationContainer.innerHTML = '';

  // Añadir botone "Anterior" "
  const prevButton = document.createElement('button');
  prevButton.textContent = 'Anterior';
  prevButton.className = 'page-btn';
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      mostrarOfertasPorPagina();
      generarPaginacion();
    }
  }) 
  paginationContainer.appendChild(prevButton);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.className = 'page-btn';
    if ( i === currentPage) button.classList.add('active');
    paginationContainer.appendChild(button);
  }

  // Añadir botón "Siguiente"
  const nextButton = document.createElement('button');
  nextButton.textContent = 'Siguiente';
  nextButton.className = 'page-btn';
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      mostrarOfertasPorPagina();
      generarPaginacion();
    }
  })
   paginationContainer.appendChild(nextButton);
}

mostrarOfertasPorPagina();
generarPaginacion();