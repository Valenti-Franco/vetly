export function Footer () {
  return (
    <div className='container mx-auto px-1 mt-5 bg-base-300 rounded-lg'>
      <div tabIndex={0} className='collapse collapse-arrow border-base-300'>
        <div id='arrow' className='collapse-title text-xl font-medium text-center'>
          <span>Más información</span>
        </div>
        <div className='collapse-content'>
          <div className='grid grid-cols-3 md:grid-cols-6 gap-2 mt-2'>
            <button className='bg-green-200 p-4'>Acerca de</button>
            <button className='bg-yellow-400 p-4'>Otros sitios</button>
            <button className='bg-blue-200 p-4'>Ayuda</button>
            <button className='bg-violet-300 p-4'>Redes sociales</button>
            <button className='bg-red-300 p-4'>Medios de Pago</button>
            <button className='bg-orange-300 p-4'>Mi cuenta</button>
          </div>

          <div className='grid grid-cols-1 gap-12'>
            <div className='p-4'>
              <button>Trabajá con nosotros</button> <button>Terminos y condiciones</button> <button>Como cuidamos tu privacidad</button> <button>Accesibilidad</button> <button>Informaicon al usuario financiero </button> <button>Ayuda</button> <button>Defensa del Consumidor</button> <button>Informacion sobre seguros</button><br />
              Copyright ©2023 Vetly <br />
              Av. Caseros 3039, Piso 2, CP 1264, Parque Patricios, CABA
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
