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
    secondValue,
    setSecondValue
  ] = useState<OnChangeEvent>()
  const [
    inputStatus,
    setInputStatus
  ] = useState<GetProp<InputProps, 'status'>>()
  const [ total, setTotal ] = useState<number>( 0 )
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
      title={ 'Calculadora de Horas' }
    /> )
  }, [] )

  function handleCalculate( op: '+' | '-' | '*' | '/' ) {
    if ( !valueValid.current ) {
      setInputStatus( () => 'error' )
      return
    }

    const { maskedValue } = value!
    const [ hor, min ] = maskedValue.split( ':' )
    const minutos = ( ( parseInt( hor ) * 60 ) + parseInt( min ) )

    const { maskedValue: secondMaskedValue } = secondValue!
    const [ secondHor, secondMin ] = secondMaskedValue.split( ':' )
    const secondMinutos = ( ( parseInt( secondHor ) * 60 ) + parseInt( secondMin ) )

    switch ( op ) {
      case '+':
        setTotal( minutos + secondMinutos )
        break
      case '-':
        setTotal( minutos - secondMinutos )
        break
      case '*':
        setTotal( minutos * secondMinutos )
        break
      case '/':
        setTotal( minutos / secondMinutos )
        break
    }

    const horas = `${ Math.floor( total / 60 ) }`.padStart( 2, '0' )
    const minutos2 = `${ total % 60 }`.padStart( 2, '0' )


    addResult( {
      op: OperationType.hourtomin,
      res: `${ horas }:${ minutos2 }`,
      a: value!.maskedValue,
      b: secondValue!.maskedValue
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
        // onPressEnter={ handleCalculate }
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
        placeholder='Valor 1'
        size='large'
        value={ value?.maskedValue }
        onChange={ ( change ) => {
          validateInput( change )
          setValue( () => change )
        } }
      />
      <MaskedInput
        allowClear
        status={ inputStatus }
        // onPressEnter={ handleCalculate }
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
        placeholder='Valor 2'
        size='large'
        value={ secondValue?.maskedValue }
        onChange={ ( change ) => {
          validateInput( change )
          setSecondValue( () => change )
        } }
      />

      <Button
        type='primary'
        onClick={ () => handleCalculate( '+' ) }
      >
        +
      </Button>
      <Button
        type='primary'
        onClick={ () => handleCalculate( '-' ) }
      >
        -
      </Button>
      <Button
        type='primary'
        onClick={ () => handleCalculate( '*' ) }
      >
        *
      </Button>
      <Button
        type='primary'
        onClick={ () => handleCalculate( '/' ) }
      >
        /
      </Button>
    </Flex>
  )
}

export default Index
