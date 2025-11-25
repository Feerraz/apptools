import { useTheme } from '@/contexts/theme'
import { CSSProperties } from 'react'
import { theme as antTheme } from 'antd'

type StylesType = {
  Container: CSSProperties
  SubContainer: CSSProperties
  Breadcrumb: CSSProperties
  Title: CSSProperties
}

/**
 * Styles
 *
 * @return {StylesType} styles
 */
function Styles(): StylesType {
  const { useToken } = antTheme
  const { token: theme } = useToken()
  const { isWidescreen } = useTheme()

  const Container: CSSProperties = {
    width: '100%',
    padding: `${ theme.paddingSM }px ${ theme.paddingSM }px 0px`,
    backgroundColor: theme.colorBgBase
  }

  const SubContainer: CSSProperties = {
    padding: `${ theme.padding }px ${ theme.paddingLG }px`,
    border: `1px solid ${ theme.colorPrimary }`,
    borderTopLeftRadius: theme.borderRadius,
    WebkitBorderTopRightRadius: theme.borderRadius,
    width: '100%',
    borderBottom: `solid 1px ${ theme.colorBorderSecondary }`,
    marginBottom: -1
  }

  const Breadcrumb: CSSProperties = {
    width: '100%',
    marginBottom: theme.marginXS,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

  const Title: CSSProperties = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: isWidescreen ? 'row' : 'column'
  }

  return {
    Container,
    SubContainer,
    Breadcrumb,
    Title
  }
}

export default Styles
