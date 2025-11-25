import Dynamic from 'next/dynamic'
import Link from 'next/link'
import {
  CSSProperties,
  ReactNode
} from 'react'
import {
  Layout,
  Menu,
  GetProp,
  MenuProps,
  theme as antTheme,
  Dropdown,
  Avatar,
  Col,
  Affix,
  Flex,
  Typography
} from 'antd'
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
  TbMoon,
  TbSettings,
  TbSun
} from 'react-icons/tb'

// types
import {
  Props,
  IconListType
} from '@/types'
export type ContainerType = {
  sideMenuDisabled?: boolean
} & Props
type ComponentIconType = {
  icon: IconListType
  style?: CSSProperties
}
type MenuItem = GetProp<MenuProps, 'items'>[ number ]

// styles
import Styles from './styles'

// contexts
import { useTheme } from '@/contexts/theme'
import { useResults } from '@/contexts/results'

// components
const {
  Content,
  Sider
} = Layout
const { Title } = Typography

/**
 * App layout container component
 *
 * @param {ContainerType} params
 * @return {ReactNode} Component
 */
function Index( {
  children,
  sideMenuDisabled
}: ContainerType ): ReactNode {
  const S = Styles()
  const { useToken } = antTheme
  const { token: theme } = useToken()
  const { results } = useResults()
  const {
    header,
    isDark,
    setIsDark,
    menuCollapsed,
    menuAvatarSize,
    collapsedMenuWidth,
    expandedMenuWidth,
    setMenuCollapsed
  } = useTheme()

  const menuItems: MenuItem[] = [ {
    key: 'conversion',
    icon: <Icon
      icon={ 'TbClock24' }
    />,
    label: 'Conversão',
    children: [ {
      key: 'mintohour',
      label: <Link
        href='/mintohour'
      >
        Minutos para Horas
      </Link>
    }, {
      key: 'hourtomin',
      label: <Link
        href='/hourtomin'
      >
        Horas para Minutos
      </Link>
    } ]
  }, {
    key: 'calchour',
    icon: <Icon
      icon={ 'TbClockPlus' }
    />,
    label: <Link
      href='/calchour'
    >
      Calculadora de Horas
    </Link>
  } ]

  /**
   * Handle toggle theme events
   */
  function toggleTheme() {
    setIsDark( () => !isDark )
  }

  /**
   * Handle toggle theme events
   */
  function toggleMenuCollapsed() {
    setMenuCollapsed( () => !menuCollapsed )
  }

  return ( <Layout
    hasSider
    style={ S.Container }
  >
    <Sider
      collapsed={ menuCollapsed ?? undefined }
      collapsedWidth={ collapsedMenuWidth }
      width={ expandedMenuWidth }
      style={ S.SiderLeft }
      className='custom-sider'
    >
      <Menu
        theme='dark'
        mode='inline'
        inlineIndent={ theme.marginXS }
        style={ S.Menu }
        inlineCollapsed={ !!menuCollapsed }
        disabled={ sideMenuDisabled }
        defaultOpenKeys={ [ 'conversion' ] }
        items={ menuItems }
      />

      <Affix
        offsetBottom={ 0 }
      >
        <Col
          style={ S.Col }
        >
          <Dropdown
            placement='topLeft'
            arrow={ {
              pointAtCenter: true
            } }
            classNames={ {
              root: 'custom-dropdown'
            } }
            styles={ {
              root: S.Dropdown
            } }
            menu={ {
              items: [ {
                key: 'theme',
                onClick: toggleTheme,
                icon: isDark ? <TbSun
                  style={ S.Icon }
                /> : <TbMoon
                  style={ S.Icon }
                />,
                label: `Tema ${ isDark ? 'claro' : 'escuro' }`,
                // o title tem que ficar em branco para evitar
                // uma tooltop aparecendo sem necessidade
                title: ''
              }, {
                key: 'menu',
                onClick: toggleMenuCollapsed,
                icon: menuCollapsed ? <TbLayoutSidebarLeftExpand
                  style={ S.Icon }
                /> : <TbLayoutSidebarLeftCollapse
                  style={ S.Icon }
                />,
                label: `Menu ${ menuCollapsed ? 'expandido' : 'retraído' }`,
                title: ''
              } ]
            } }
          >
            <Avatar
              style={ S.Avatar }
              size={ menuAvatarSize }
              icon={ <TbSettings
                style={ S.Icon }
              /> }
            />
          </Dropdown>
        </Col>
      </Affix>
    </Sider>

    <Layout
      style={ S.Header }
    >
      { header }
    </Layout>

    <Layout
      style={ S.SubContainer }
    >
      <Content
        style={ S.Content }
      >
        { children }
      </Content>

      <Sider
        collapsed={ menuCollapsed ?? undefined }
        collapsedWidth={ collapsedMenuWidth }
        width={ expandedMenuWidth }
        style={ S.SiderRight }
        className='custom-sider'
      >
        <Title
          level={ 3 }
        >
          Histórico de cálculos:
        </Title>

        <Flex
          orientation='vertical'
          gap={ 'small' }
        >
          { results.map( ( {
            op,
            res,
            a,
            b
          }, index ) => {
            return <span
              key={ index }
            >
              { a } -{ '>' } { res }
            </span>
          } ) }
        </Flex>
      </Sider>
    </Layout>
  </Layout > )
}

/**
 * Icon component
 * 
 * @param {ComponentIconType} params Params
 * @returns {ReactNode} Component
 */
function Icon( {
  icon,
  style
}: ComponentIconType ): ReactNode {
  const Icon = Dynamic( () => import( 'react-icons/tb' ).then( ( Icons ) => {
    return Icons[ icon ]
  } ) )

  return <span
    role='img'
    className='anticon ant-menu-item-icon'
  >
    <Icon
      size={ 24 }
      style={ style }
    />
  </span>
}

export default Index
