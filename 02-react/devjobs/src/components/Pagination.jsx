// src/components/Pagination.jsx
import React from 'react'
import styles from './Pagination.module.css'

export function Pagination({ currentPage = 1, totalPages = 1, onPageChange }) {
  // Si totalPages es 0 o 1, aún mostramos la numeración mínima (1) para evitar "todo bloqueado"
  const pagesCount = Math.max(1, totalPages)

  const goto = (page) => {
    if (page === currentPage) return
    if (page < 1 || page > pagesCount) return
    if (typeof onPageChange === 'function') onPageChange(page)
  }

  const prevDisabled = currentPage <= 1
  const nextDisabled = currentPage >= pagesCount

  const renderPageButtons = () => {
    const buttons = []
    for (let i = 1; i <= pagesCount; i++) {
      buttons.push(
        <button
          key={i}
          className={`${styles.pageBtn} ${i === currentPage ? styles.active : ''}`}
          onClick={() => goto(i)}
          aria-current={i === currentPage ? 'page' : undefined}
          aria-label={i === currentPage ? `Página ${i}, actual` : `Ir a la página ${i}`}
          disabled={false} // permitimos que el botón siempre sea clicable (controlamos con goto)
        >
          {i}
        </button>
      )
    }
    return buttons
  }

  return (
    <nav className={styles.pagination} role="navigation" aria-label="Paginación de resultados">
      <button
        className={styles.pageBtn}
        onClick={() => goto(currentPage - 1)}
        aria-label="Página anterior"
        disabled={prevDisabled}
      >
        &lt;
      </button>

      <div className={styles.pagesWrapper}>
        {renderPageButtons()}
      </div>

      <button
        className={styles.pageBtn}
        onClick={() => goto(currentPage + 1)}
        aria-label="Página siguiente"
        disabled={nextDisabled}
      >
        &gt;
      </button>
    </nav>
  )
}
