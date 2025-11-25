import { ThemeConfig } from 'antd/es/config-provider/context'
import { theme } from 'antd'
const {
  defaultAlgorithm,
  getDesignToken
} = theme

const light: ThemeConfig = {
  algorithm: defaultAlgorithm,
  token: {
    colorPrimary: '#5e35e6',
    colorLink: '#5e35e6',
    colorLinkActive: '#4222bf',
    colorLinkHover: '#865ef2',
    colorBgLayout: '#ffffff',
    colorBgBase: '#ffffff'
  },
  components: {
    Tag: {
      // remove a margem de 8px no lado direito da tag
      marginXS: 0
    },
    Menu: {
      darkItemBg: '#5e35e6',
      darkItemColor: '#ffffffd9',
      darkItemHoverBg: '#FFFFFF14',
      darkItemSelectedBg: '#ffffff3d',
      darkItemSelectedColor: '#ffffff',
      subMenuItemSelectedColor: '#ffffff',
      darkSubMenuItemBg: '#5e35e6',
      darkPopupBg: '#5e35e6',
      collapsedIconSize: 24
    }
  }
}

export const colors = {
  ...getDesignToken( light ),
  // cores usados na detecção facial
  inidicatorInactive: '#af8cff',
  indicatorActive: '#865ef2',
  ringInactive: '#ceb5ff',
  ringActive: '#af8cff'
}
export const customComponents: ThemeConfig[ 'components' ] = {
  Tag: {
    defaultBg: `${ colors.colorPrimary }1a`,
    defaultColor: colors.colorPrimary,
    colorBorder: `${ colors.colorPrimary }80`
  }
}

export default light
