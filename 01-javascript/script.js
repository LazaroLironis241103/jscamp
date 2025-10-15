// ../01-javascript/script.js
document.addEventListener('DOMContentLoaded', () => {
  const jobsListingSection = document.querySelector('.jobs-listings');
  const jobsArticles = Array.from(jobsListingSection?.querySelectorAll('article') || []);
  const selectTech = document.getElementById('filter-technology');
  const selectLocation = document.getElementById('location');
  const selectContract = document.getElementById('contract-type');
  const selectExperience = document.getElementById('experience-level');

  // Util: normaliza cadena para búsqueda (quita mayúsculas y diacríticos)
  const normalize = (str = '') =>
    String(str).normalize?.('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase() || String(str).toLowerCase();

  // Muestra mensaje cuando no hay resultados
  function showNoResults(show) {
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

  // Obtiene metadatos del artículo (lee data-* si existen)
  function metaFromArticle(article) {
    const title = article.querySelector('.job-header h3')?.textContent.trim() || '';
    const companyLine = article.querySelector('h6')?.textContent.trim() || '';
    const description = article.querySelector('p')?.textContent.trim() || '';
    const technology = (article.dataset.technology || '').trim();
    const location = (article.dataset.location || '').trim();
    const contract = (article.dataset.contract || '').trim();
    const experience = (article.dataset.experience || '').trim();
    return { title, companyLine, description, technology, location, contract, experience };
  }

  // Aplica los filtros a los artículos y actualiza visibilidad
  function applyFilters() {
    const qTech = (selectTech?.value || '').toLowerCase();
    const qLoc = (selectLocation?.value || '').toLowerCase();
    const qContract = (selectContract?.value || '').toLowerCase();
    const qExp = (selectExperience?.value || '').toLowerCase();

    let visibleCount = 0;

    jobsArticles.forEach(article => {
      const meta = metaFromArticle(article);

      // Si hay data-* y no vacío, prioriza comparación exacta con select
      const matchTech = !qTech || (meta.technology && meta.technology.toLowerCase() === qTech) ||
        (!meta.technology && (meta.title + ' ' + meta.description + ' ' + meta.companyLine).toLowerCase().includes(qTech));

      const matchLoc = !qLoc || (meta.location && meta.location.toLowerCase() === qLoc) ||
        (!meta.location && (meta.companyLine + ' ' + meta.description).toLowerCase().includes(qLoc));

      const matchContract = !qContract || (meta.contract && meta.contract.toLowerCase() === qContract) ||
        (!meta.contract && (meta.description + ' ' + meta.title).toLowerCase().includes(qContract));

      const matchExp = !qExp || (meta.experience && meta.experience.toLowerCase() === qExp) ||
        (!meta.experience && (meta.description + ' ' + meta.title).toLowerCase().includes(qExp));

      const visible = matchTech && matchLoc && matchContract && matchExp;

      article.style.display = visible ? '' : 'none';
      if (visible) visibleCount++;
    });

    showNoResults(visibleCount === 0);
  }

  // Delegación para botones "Aplicar"
  if (jobsListingSection) {
    jobsListingSection.addEventListener('click', (event) => {
      const btn = event.target.closest('.button-apply-job');
      if (!btn) return;
      // comportamiento original: marcar aplicado
      btn.textContent = '¡Aplicado!';
      btn.classList.add('is-applied');
      btn.disabled = true;
    });
  } else {
    console.warn('No se encontró .jobs-listings en el DOM');
  }

  // Conectar selects a la función de filtrado
  [selectTech, selectLocation, selectContract, selectExperience].forEach(sel => {
    if (!sel) return;
    sel.addEventListener('change', applyFilters);
  });

  // Si quieres aplicar filtros en load (por ejemplo, si hay valores por defecto)
  applyFilters();
});
