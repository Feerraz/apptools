import MenuPage from '../menu'
import { MaskedInput } from 'antd-imask-input'
import { useState } from 'react'
import { Hours } from '@/src/types/hours'

function Index() {

  const [value, setValue] = useState('')
  const [result, setResult] = useState<Hours>([])

  const calcular = (value: string) => {
    const qtdHour = Math.floor(Number(value) / 60)
    const qtdMin = Number(value) % 60

    const horaStr = String(qtdHour).padStart(2, '0')
    const minStr = String(qtdMin).padStart(2, '0')


    return (
      setResult(result => [...result, 
        { horas: horaStr, 
          minutos: minStr, 
          qtdMin: value }])
    )
  }

  function MaskedMinutes() {
    return (
      <MaskedInput
        mask={Number}
        maskOptions={{
          lazy: true
        }}
        placeholder='Digite a quantidade de minutos'
        size='large'
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    )
  }

  return (
    <div>
      <MenuPage />
      <div style={{ marginLeft: '256px', padding: '20px' }}>
        <h1 className='titulo-gradiente'>Minutos para Horas</h1>
        <label style={{ display: 'block', marginBottom: '4px' }}>
          <MaskedMinutes />
        </label>
        <button className='button-calculate' onClick={() => calcular(value)}>Calcular</button>
        <div className='divMinuteToHour'> Resultados:
        <ul style={{ listStyleType: 'none'}}>
            {result.map((item, index) => (
              <li key={index}>{item.qtdMin} - {item.horas}:{item.minutos}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Index
