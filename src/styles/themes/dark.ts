import { ThemeConfig } from 'antd/es/config-provider/context'
import { theme } from 'antd'
const {
  darkAlgorithm,
  getDesignToken
} = theme


const dark: ThemeConfig = {
  algorithm: darkAlgorithm,
  token: {
    colorPrimary: '#865ef2',
    colorLink: '#865ef2',
    colorLinkActive: '#44299d',
    colorLinkHover: '#7b57dc',
    colorBgBase: '#000000'
  },
  components: {
    Tag: {
      // remove a margem de 8px no lado direito da tag
      marginXS: 0
    },
    Menu: {
      darkItemBg: '#865ef2',
      darkItemColor: '#ffffffd9',
      darkItemHoverBg: '#FFFFFF14',
      darkItemSelectedBg: '#ffffff3d',
      darkItemSelectedColor: '#ffffff',
      subMenuItemSelectedColor: '#ffffff',
      darkSubMenuItemBg: '#865ef2',
      darkPopupBg: '#865ef2',
      collapsedIconSize: 24
    }
  }
}

export const colors = {
  ...getDesignToken( dark ),
  // cores usados na detecção facial
  inidicatorInactive: '#fff',
  indicatorActive: '#865ef2',
  ringInactive: '#fff',
  ringActive: '#fff'
}
export const customComponents: ThemeConfig[ 'components' ] = {
  Tag: {
    defaultBg: `${ colors.colorPrimary }1a`,
    defaultColor: colors.colorPrimary,
    colorBorder: `${ colors.colorPrimary }80`
  }
}


export default dark
