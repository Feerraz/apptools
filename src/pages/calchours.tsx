import {
  useEffect,
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
    firstValue,
    setFirstValue
  ] = useState<OnChangeEvent>()
  const [
    secondValue,
    setSecondValue
  ] = useState<OnChangeEvent>()
  const [
    inputStatus,
    setInputStatus
  ] = useState<GetProp<InputProps, 'status'>>()
  const rangeMask: Partial<MaskedPattern> = {
    blocks: {
      mm: {
        mask: IMask.MaskedRange,
        from: 0,
        to: 59
      }
    }
  }
  const hourMask = {
    mask: [
      { mask: '\\0\\0`:\\00' },
      { mask: '\\0\\0`:mm', ...rangeMask },
      { mask: '\\00`:mm', ...rangeMask },
      { mask: '00`:mm', ...rangeMask },
      { mask: '000:mm', ...rangeMask },
      { mask: '0000:mm', ...rangeMask },
      { mask: '00000:mm', ...rangeMask },
      { mask: '000000:mm', ...rangeMask },
    ]
  }

  useEffect( () => {
    setHeader( () => <PageHeader
      title={ 'Calculadora de Horas' }
    /> )
  }, [] )


  function handleCalculate( op: '+' | '-' ) {
    if ( !firstValue?.maskedValue.includes( ':' )
      || !secondValue?.maskedValue.includes( ':' ) ) {
      setInputStatus( 'error' )
      return
    }
    const { maskedValue } = firstValue!
    const [ hor1, min1 ] = maskedValue.split( ':' )
    const totMin1 = ( ( parseInt( hor1 ) * 60 ) + parseInt( min1 ) )

    const { maskedValue: secondMaskedValue } = secondValue!
    const [ hor2, min2 ] = secondMaskedValue.split( ':' )
    const totMin2 = ( ( parseInt( hor2 ) * 60 ) + parseInt( min2 ) )

    const resultado = ( () => {
      switch ( op ) {
        case '+': return totMin1 + totMin2
        case '-': return totMin1 - totMin2
        default: return totMin1
      }
    } )()

    const horas = `${ Math.floor( resultado / 60 ) }`.padStart( 2, '0' )
    const minutos = `${ resultado % 60 }`.padStart( 2, '0' )

    addResult( {
      op: OperationType.hourtomin,
      res: `${ horas }:${ minutos }`,
      a: firstValue!.maskedValue,
      b: secondValue!.maskedValue
    } )
    setFirstValue( () => undefined )
    setSecondValue( () => undefined )
    setInputStatus( 'success' )
  }

  return (
    <Flex
      orientation='vertical'
      gap='middle'
    >
      <MaskedInput
        allowClear
        status={ inputStatus }
        maskOptions={ hourMask }
        placeholder='Valor 1'
        size='large'
        value={ firstValue?.maskedValue
        }
        onChange={ ( change ) => {
          setFirstValue( () => change )
        } }
      />
      <MaskedInput
        allowClear
        status={ inputStatus }
        maskOptions={ hourMask }
        placeholder='Valor 2'
        size='large'
        value={ secondValue?.maskedValue }
        onChange={ ( change ) => {
          setSecondValue( () => change )
        } }
      />
      <Button
        type='primary'
        onClick={ () => handleCalculate( '+' ) }
      >
        Somar (+)
      </Button>
      <Button
        type='primary'
        onClick={ () => handleCalculate( '-' ) }
      >
        Subtrair (-)
      </Button>
    </Flex>
  )
}

export default Index
