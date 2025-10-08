const boton = document.querySelector('#boton-importante')

    boton.addEventListener('click',() => {
      boton.textContent = 'Aplicado'
      boton.computedStyleMap.background = '#4caf50'
    })

    