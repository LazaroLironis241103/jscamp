import styles from './Pagination.module.css'

export function Pagination({
  currentPage = 1,
  totalPages = 5,
  onPageChange = () => {}
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const handleClick = (e, page) => {
    e.preventDefault()
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page)
    }
  }

  const styleLink = (disabled) => ({
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer'
  })

  return (
    <nav className={styles.pagination}>
      <a
        href="#"
        onClick={(e) => handleClick(e, currentPage - 1)}
        className={styles.link}
        style={styleLink(currentPage === 1)}
        aria-disabled={currentPage === 1}
      >
        ←
      </a>

      {pages.map((page) => (
        <a
          key={page}
          href="#"
          className={`${styles.link} ${currentPage === page ? styles.isActive : ''}`}
          onClick={(e) => handleClick(e, page)}
        >
          {page}
        </a>
      ))}

      <a
        href="#"
        onClick={(e) => handleClick(e, currentPage + 1)}
        className={styles.link}
        style={styleLink(currentPage === totalPages)}
        aria-disabled={currentPage === totalPages}
      >
        →
      </a>
    </nav>
  )
}
