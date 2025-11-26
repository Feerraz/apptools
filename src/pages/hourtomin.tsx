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
      title={ 'Horas para Minutos' }
    /> )
  }, [] )

  function handleCalculate() {

    if ( !value.includes( ':' ) ) return

    const hor = value.split( ':' )
    const minutos = ( ( parseInt( hor[ 0 ] ) * 60 ) + ( parseInt( hor[ 1 ] ) ) ).toString()

    addResult( {
      op: OperationType.hourtomin,
      res: String( minutos ),
      a: value
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
          mask: '000:00',
          lazy: true
        } }
        placeholder='Horas (hh:mm)'
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
