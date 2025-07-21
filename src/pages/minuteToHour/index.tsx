import MenuPage from '../menu'
import MaskedInput from 'antd-imask-input'
import { ReactNode } from 'react'

function MaskedMinutes() {

  return (
    <MaskedInput
      mask={ '000' }
      maskOptions={ {
        lazy: false
      } }
      placeholder={ 'Digite a quantidade de minutos' }
      size={ 'large' }
      allowClear={ false }
      autoComplete='off'

    />
  )
}

function MyMaskedInputComponent() {
  return (
    <MaskedInput
      mask={ '00:00' }
      maskOptions={ {
        lazy: true // makes mask placeholder invisible
      } }
      placeholder={ 'Resultado' }
      size={ 'large' }
      allowClear={ true }
      autoComplete='off'
      disabled
    />
  )
}



function Index(): ReactNode {

  const calcular = () => {

    const qtdMin = document.getElementById( 'qtdMin' ) as HTMLInputElement
    const qtdMinutos = Number( qtdMin.value )
    const qtdHour = Math.floor( qtdMinutos / 60 )
    const qtdMinRest = qtdMinutos % 60

    //alert( `${ qtdHour }:${ qtdMinRest }` )
    return ( document.getElementById( 'resultado' ) as HTMLInputElement ).value = `${ qtdHour }:${ qtdMinRest }`
  }


  return (
    <div>
      <MenuPage />
      <div style={ { marginLeft: '256px', padding: '20px' } }>
        <h1>Minutos para Horas</h1>
        <label style={ { display: 'block', marginBottom: '4px' } }>
          <MaskedMinutes />
        </label>
        <label style={ { display: 'block', marginBottom: '4px' } }>
          Resultado:
          <input type="text" id='resultado' disabled />
          <MyMaskedInputComponent />
        </label>
        <button onClick={ calcular }>Calcular</button>

      </div>
    </div>
  )
}

export default Index
