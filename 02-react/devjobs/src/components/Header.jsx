// src/components/Header.jsx
export function Header() {
  return (
    <header>
      <div className="header-left">
        <a href="#" className="logo" aria-label="DevJobs">
          <svg width="48" height="48" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path clipRule="evenodd"
              d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z"
              fill="currentColor" fillRule="evenodd"></path>
          </svg>
        </a>

        <h1>DevJobs</h1>

        <nav className="navbar" aria-label="Navegación principal">
          <a href="index.html">Inicio</a>
          <a href="empleos.html">Empleos</a>
          <a href="#">Empresas</a>
          <a href="#">Salarios</a>
        </nav>
      </div>

      <div className="header-right">
        <a href="#" className="upload-btn">Subir CV</a>
        <a href="#" aria-label="Perfil">
          <img src="avatar.png" alt="Foto de perfil" />
        </a>
      </div>
    </header>
  )
}
