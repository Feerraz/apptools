import MenuPage from '../menu'
import { useState } from 'react'

function Index() {
  type Turnos = {
    entrada: string
    saida: string
  }

  const [turno, setTurnos] = useState<Turnos[]>([
    { entrada: '00:00', saida: '00:00' }
  ])

  const addTurno = () => {
    setTurnos([...turno, { entrada: '', saida: '' }])
  }

  const handleAddTurno = (index: number, field: keyof Turnos, value: string) => {
    const novoTurno = [...turno]
    novoTurno[index][field] = value
    setTurnos(novoTurno)
  }

  return (
    <div>
      <MenuPage />
      <div style={{ marginLeft: '256px', padding: '20px' }}>
        <h1 className="titulo-gradiente">Horas Trabalhadas</h1>
      </div>

      {turno.map((turnos, index) => (
        <div key={index}>
          <input
            type="time"
            value={turnos.entrada}
            onChange={(e) => handleAddTurno(index, 'entrada', e.target.value)}
          />
          <input
            type="time"
            value={turnos.saida}
            onChange={(e) => handleAddTurno(index, 'saida', e.target.value)}
          />
        </div>
      ))}
    
      <button onClick={addTurno}>Adicionar</button>
    </div>
  )
}

export default Index
