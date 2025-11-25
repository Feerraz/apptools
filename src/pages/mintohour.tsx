import {
  useEffect,
  useState
} from 'react'
import {
  Button,
  Flex
} from 'antd'
import { MaskedInput } from 'antd-imask-input'

// contexts
import { useTheme } from '@/contexts/theme'
import {
  OperationType,
  useResults
} from '@/contexts/results'

// components
import PageHeader from '@/components/Header'

function Index() {
  const { setHeader } = useTheme()
  const { addResult } = useResults()
  const [
    value,
    setValue
  ] = useState<string>( '' )

  useEffect( () => {
    setHeader( () => <PageHeader
      title={ 'Minutos para Horas' }
    /> )
  }, [] )

  function handleCalculate() {
    if ( value == '' ) return

    const qtdHor = Math.floor( Number( value ) / 60 )
    const qtdMin = Number( value ) % 60
    const horas = String( qtdHor ).padStart( 2, '0' )
    const minutos = String( qtdMin ).padStart( 2, '0' )

    addResult( {
      op: OperationType.mintohour,
      res: `${ horas }:${ minutos }`,
      a: String( value )
    } )
    setValue( () => '' )
  }

  return (
    <Flex
      orientation='vertical'
      gap='middle'
    >
      <MaskedInput
        allowClear
        onPressEnter={ handleCalculate }
        maskOptions={ {
          mask: Number,
          lazy: true
        } }
        placeholder='Minutos'
        size='large'
        value={ value }
        onChange={ ( { maskedValue } ) => setValue( () => maskedValue ) }
      />

      <Button
        type='primary'
        onClick={ handleCalculate }
      >
        Calcular
      </Button>
    </Flex>
  )
}

export default Index
