import { Form } from '../components/Form'

export default function LoginPage () {
  return (
    <section className='mx-5 grid md:grid-cols-2 items-center gap-5 h-full'>
      <div>
        <p>¡Estás a un paso!</p>
        <h2 className='text-5xl lg:text-4xl'>Inicia sesión o crea una nueva cuenta para poder iniciar tu consulta</h2>
      </div>
      <Form />
    </section>
  )
}
