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
      title={ 'Minutos Noturnos' }
    /> )
  }, [] )

  function handleCalculate() {
    if ( value == '' ) return

    const minutosNoturnos = ( Number( value ) * 1.142857 ).toFixed( 0 )

    addResult( {
      op: OperationType.mintonot,
      res: `${ minutosNoturnos }`,
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
        placeholder='Minutos * 1,142857'
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
