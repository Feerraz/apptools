import MenuPage from '../menu'
import Input from 'antd'

import InputMasked from 'antd-imask-input'
import { ReactNode } from 'react'

function MyMaskedInputComponent() {

  return (
    <InputMasked
      mask={ '000.000.000-00' }
      maskOptions={ {
        lazy: true // makes mask placeholder invisible
      } }
      placeholder={ 'Type here' }
      size={ 'large' }
      allowClear={ true }
      autoComplete='off'
      onChange={ e => console.log( e ) }
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
          Minutos:
          <input type="text" id='qtdMin' />
        </label>
        <label style={ { display: 'block', marginBottom: '4px' } }>
          Resultado:
          <input type="text" id='resultado' disabled />
        </label>

        <button onClick={ calcular }>Calcular</button>

      </div>
    </div>
  )
}

export default Index
