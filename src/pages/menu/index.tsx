"use client"

import React, { useState } from 'react'
import {
  CalendarOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons'

import { Divider, Menu, Switch } from 'antd'
import type { GetProp, MenuProps } from 'antd'
import { useRouter } from 'next/navigation'


type MenuItem = GetProp<MenuProps, 'items'>[ number ]


const Index: React.FC = () => {
  const [ mode, setMode ] = useState<'vertical' | 'inline'>( 'inline' )

  const changeMode = ( value: boolean ) => {
    setMode( value ? 'vertical' : 'inline' )
  }

  const router = useRouter()

  const handleMenuClick = ( e: { key: string } ) => {
    if ( e.key === 'horMin' ) {
      router.push( '/hourToMinute' )
    }

    if ( e.key === 'minHor' ) {
      router.push( '/minuteToHour' )
    }
    // Add other menu item handlers here
  }

  const items: MenuItem[] = [
    {
      key: '1',
      icon: <ClockCircleOutlined />,
      label: 'Cálculos de Horas',
      children: [
        { key: 'horMin', label: 'Horas para minutos', onClick: handleMenuClick },
        { key: 'minHor', label: 'Minutos para horas', onClick: handleMenuClick },
        { key: 'horTra', label: 'Horas trabalhadas', },
        { key: 'CalHor', label: 'Calculadora de horas', },
      ],
    },
    {
      key: '2',
      icon: <CalendarOutlined />,
      label: 'Centesimais',
      children: [
        { key: 'cenDec', label: 'Centesimal para decimal' },
        { key: 'decCen', label: 'Decimal para centesimal' },
        { key: 'CenHor', label: 'Centesimal para horas' },
        { key: 'HorCen', label: 'Horas para centesimal' },
      ],
    }
  ]

  return (
    <>
      <Menu
        style={ { width: 256, position: 'absolute' } }
        defaultOpenKeys={ [ '1', '2' ] }
        mode={ mode }
        items={ items }
      />
    </>
  )
}

export default Index
