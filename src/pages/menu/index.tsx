"use client"
import {
  // CalendarOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons'

<<<<<<< HEAD
import { Menu } from 'antd'
=======
import {
  Menu
} from 'antd'
>>>>>>> 917ca1c (firebase config)
import type { GetProp, MenuProps } from 'antd'
import { useRouter } from 'next/navigation'


type MenuItem = GetProp<MenuProps, 'items'>[number]


const Index: React.FC = () => {
<<<<<<< HEAD
  const mode = 'inline'
=======
  const [mode] = useState<'vertical' | 'inline'>('inline')

  // const changeMode = (value: boolean) => {
  //   setMode(value ? 'vertical' : 'inline')
  // }
>>>>>>> 917ca1c (firebase config)

  const router = useRouter()

  const handleMenuClick = (e: { key: string }) => {
    if (e.key === 'horMin') {
      router.push('/hourToMinute')
    }

    if (e.key === 'minHor') {
      router.push('/minuteToHour')
    }
<<<<<<< HEAD

    if ( e.key === 'cenDec' ) {
      router.push( '/centToDec' )
    }
    if ( e.key === 'decCen' ) {
      router.push( '/DecToCent' )
    }
    if ( e.key === 'CenHor' ) {
      router.push( '/CentToHour' )
    }
    if ( e.key === 'HorCen' ) {
      router.push( '/HourToCent' )
    }

=======
    // if (e.key === 'horTra') {
    //   router.push('/hoursWorked')
    // }
    // if (e.key === 'calHor') {
    //   router.push('/calcHours')
    // }
>>>>>>> 917ca1c (firebase config)
  }

  const items: MenuItem[] = [
    {
      key: '1',
      icon: <ClockCircleOutlined />,
      label: 'Cálculos de Horas',
      children: [
        { key: 'horMin', label: 'Horas para minutos', onClick: handleMenuClick },
        { key: 'minHor', label: 'Minutos para horas', onClick: handleMenuClick },
        // { key: 'horTra', label: 'Horas trabalhadas', onClick: handleMenuClick },
        // { key: 'calHor', label: 'Calculadora de horas', onClick: handleMenuClick },
      ],
    },
<<<<<<< HEAD
    {
      key: '2',
      icon: <CalendarOutlined />,
      label: 'Centesimais',
      children: [
        { key: 'cenDec', label: 'Centesimal para decimal', onClick: handleMenuClick },
        { key: 'decCen', label: 'Decimal para centesimal', onClick: handleMenuClick },
        { key: 'CenHor', label: 'Centesimal para horas', onClick: handleMenuClick },
        { key: 'HorCen', label: 'Horas para centesimal', onClick: handleMenuClick },
      ],
    }
=======
    // {
    //   key: '2',
    //   icon: <CalendarOutlined />,
    //   label: 'Centesimais',
    //   children: [
    //     { key: 'cenDec', label: 'Centesimal para decimal' },
    //     { key: 'decCen', label: 'Decimal para centesimal' },
    //     { key: 'CenHor', label: 'Centesimal para horas' },
    //     { key: 'HorCen', label: 'Horas para centesimal' },
    //   ],
    // }
>>>>>>> 917ca1c (firebase config)
  ]

  return (
    <>
      <Menu
        style={{ width: 256, position: 'absolute' }}
        defaultOpenKeys={['1', '2']}
        mode={mode}
        items={items}
      />
    </>
  )
}

export default Index
