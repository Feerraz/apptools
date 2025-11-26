import {
  useEffect,
  useRef,
  useState
} from 'react'
import {
  Button,
  Flex,
  GetProp,
  InputProps
} from 'antd'
import {
  IMask,
  MaskedInput,
  OnChangeEvent
} from 'antd-imask-input'

// contexts
import { useTheme } from '@/contexts/theme'
import {
  OperationType,
  useResults
} from '@/contexts/results'

// components
import PageHeader from '@/components/Header'
import { MaskedPattern } from 'imask'

function Index() {
  const { setHeader } = useTheme()
  const { addResult } = useResults()
  const [
    value,
    setValue
  ] = useState<OnChangeEvent>()
  const [
    inputStatus,
    setInputStatus
  ] = useState<GetProp<InputProps, 'status'>>()
  const valueValid = useRef( false )
  const rangeMask: Partial<MaskedPattern> = {
    blocks: {
      mm: {
        mask: IMask.MaskedRange,
        from: 0,
        to: 59
      }
    }
  }

  useEffect( () => {
    setHeader( () => <PageHeader
      title={ 'Horas para Minutos' }
    /> )
  }, [] )

  function handleCalculate() {
    if ( !valueValid.current ) {
      setInputStatus( () => 'error' )
      return
    }

    const { maskedValue } = value!
    const [ hor, min ] = maskedValue.split( ':' )
    const minutos = ( ( parseInt( hor ) * 60 ) + parseInt( min ) ).toString()

    addResult( {
      op: OperationType.hourtomin,
      res: String( minutos ),
      a: value!.maskedValue
    } )
    setValue( () => undefined )
  }

  function validateInput( {
    maskedValue
  }: OnChangeEvent ) {
    setInputStatus( () => undefined )
    valueValid.current = maskedValue.includes( ':' )
  }

  return (
    <Flex
      orientation='vertical'
      gap='middle'
    >
      <MaskedInput
        allowClear
        status={ inputStatus }
        onPressEnter={ handleCalculate }
        maskOptions={ {
          mask: [ {
            mask: '\\0\\0`:\\00',
          }, {
            mask: '\\0\\0`:mm',
            ...rangeMask
          }, {
            mask: '\\00`:mm',
            ...rangeMask
          }, {
            mask: '00`:mm',
            ...rangeMask
          }, {
            mask: '000:mm',
            ...rangeMask
          }, {
            mask: '0000:mm',
            ...rangeMask
          }, {
            mask: '00000:mm',
            ...rangeMask
          }, {
            mask: '000000:mm',
            ...rangeMask
          } ]
        } }
        placeholder='Horas'
        size='large'
        value={ value?.maskedValue }
        onChange={ ( change ) => {
          validateInput( change )
          setValue( () => change )
        } }
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
