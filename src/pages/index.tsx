"use client"
import {
  CalculatorOutlined,
  SwapOutlined
} from '@ant-design/icons'

import {
  Menu
} from 'antd'
import type { GetProp, MenuProps } from 'antd'
import { useRouter } from 'next/navigation'


type MenuItem = GetProp<MenuProps, 'items'>[ number ]


const Index: React.FC = () => {

  const router = useRouter()

  const handleMenuClick = ( e: { key: string } ) => {
    if ( e.key === 'conversions' ) {
      router.push( '/conversions' )
    }

    if ( e.key === 'calculations' ) {
      router.push( '/calculations' )
    }
  }

  const items: MenuItem[] = [
    {
      key: 'conversions',
      icon: <SwapOutlined />,
      label: 'Conversões',
      onClick: handleMenuClick
    },
    {
      key: 'calculations',
      icon: <CalculatorOutlined />,
      label: 'Cálculos',
      onClick: handleMenuClick
    }
  ]

  return (
    <>
      <Menu
        style={ { width: 256, position: 'absolute' } }
        items={ items }
      />
    </>
  )
}

export default Index
