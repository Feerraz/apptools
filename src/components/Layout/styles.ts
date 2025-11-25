import { CSSProperties } from 'react'
import { theme as antTheme } from 'antd'

// contexts
import { useTheme } from '@/contexts/theme'

type StylesType = {
  Container: CSSProperties
  SiderLeft: CSSProperties
  SiderRight: CSSProperties
  Header: CSSProperties
  SubContainer: CSSProperties
  Content: CSSProperties
  Menu: CSSProperties
  Col: CSSProperties
  Dropdown: CSSProperties,
  Icon: CSSProperties
  Avatar: CSSProperties
}

/**
 * Styles
 *
 * @return {StylesType} styles
 */
function Styles(): StylesType {
  const { useToken } = antTheme
  const { token: theme } = useToken()
  const {
    isDark,
    menuButtonsHeight,
    menuAvatarSize,
    menuCollapsed,
    collapsedMenuWidth,
    expandedMenuWidth
  } = useTheme()
  const menuSize = ( menuCollapsed ?
    collapsedMenuWidth : expandedMenuWidth
  ) + theme.marginSM

  const Container: CSSProperties = {
    backgroundColor: theme.colorBgBase,
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: menuSize,
    paddingRight: menuSize,
    minHeight: '100vh',
    transition: 'all ease 0.2s',
    transitionProperty: 'all, background',
    transitionDuration: '0.2s, 0s'
  }

  const Sider: CSSProperties = {
    overflow: 'hidden',
    position: 'fixed',
    top: theme.marginSM,
    bottom: theme.marginSM,
    borderRadius: theme.borderRadiusLG,
    padding: `${ theme.paddingSM }px 0`
  }

  const SiderLeft: CSSProperties = {
    ...Sider,
    backgroundColor: theme.Menu?.darkItemBg,
    left: theme.marginSM,
  }

  const SiderRight: CSSProperties = {
    ...Sider,
    backgroundColor: theme.colorBgMask,
    right: theme.marginSM,
  }

  const Header: CSSProperties = {
    width: '100%',
    backgroundColor: theme.colorBgBase,
    flex: 'none'
  }

  const SubContainer: CSSProperties = {
    padding: theme.paddingSM,
    paddingTop: 0,
    backgroundColor: theme.colorBgLayout,
    width: '100%',
    flex: 'auto',
    overflow: 'hidden'
  }

  const Content: CSSProperties = {
    backgroundColor: theme.colorBgLayout,
    borderLeft: `1px solid ${ theme.colorPrimary }`,
    borderRight: `1px solid ${ theme.colorPrimary }`,
    borderBottom: `1px solid ${ theme.colorPrimary }`,
    borderRadius: theme.borderRadius,
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
    padding: theme.paddingSM,
    display: 'flex',
    flexDirection: 'column',
    flex: 'auto'
  }

  const Menu: CSSProperties = {
    flex: 1,
    marginBottom: theme.marginLG,
    maxHeight: `calc(100vh - ${ (
      theme.marginSM * 2 +
      menuButtonsHeight +
      menuAvatarSize,
      theme.marginLG
    ) }px)`,
    overflow: 'auto',
    scrollbarWidth: 'thin',
    scrollbarColor: `${ theme.colorPrimary } ${ theme.colorPrimaryBorder }`
  }

  const Col: CSSProperties = {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: isDark ? theme.colorText : theme.colorBgLayout
  }

  const Dropdown: CSSProperties = {
    minWidth: '230px',
    maxWidth: '230px'
  }

  const Icon: CSSProperties = {
    width: '20px',
    height: '20px'
  }

  const Avatar = {
    borderStyle: 'solid',
    cursor: 'pointer',
    borderWidth: 3,
    borderColor: isDark ? theme.colorText : theme.colorBgLayout,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  return {
    Container,
    SiderLeft,
    SiderRight,
    Header,
    SubContainer,
    Content,
    Menu,
    Col,
    Dropdown,
    Icon,
    Avatar
  }
}

export default Styles
