import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import {
  App,
  ConfigProvider,
  Grid
} from 'antd'
import ptBR from 'antd/locale/pt_BR'

// contexts
import { ModalsProvider } from '@/contexts/modals'

// hooks
import usePersistedState from '@/hooks/usePersistedState'

// themes
import LightTheme, {
  colors as lightThemeColors,
  customComponents as lightThemeCustomComponents
} from '@/styles/themes/light'
import DarkTheme, {
  colors as darkThemeColors,
  customComponents as darkThemeCustomComponents
} from '@/styles/themes/dark'

// types
import { Props } from '@/types'
type ThemeType = typeof LightTheme | typeof DarkTheme
type CustomComponentsType = typeof darkThemeCustomComponents | typeof lightThemeCustomComponents
type ContextType = {
  schema: ThemeType
  header: ReactNode
  setHeader: Dispatch<SetStateAction<ReactNode>>
  isDark: boolean
  setIsDark: Dispatch<SetStateAction<boolean>>
  menuCollapsed: boolean
  setMenuCollapsed: Dispatch<SetStateAction<boolean>>
  isWidescreen: boolean
  colors: typeof lightThemeColors | typeof darkThemeColors
  darkThemeColors: typeof darkThemeColors
  lightThemeColors: typeof lightThemeColors
  customComponents: CustomComponentsType
  collapsedMenuWidth: number
  expandedMenuWidth: number
  menuButtonsHeight: number
  menuAvatarSize: number
}

// components
const { useBreakpoint } = Grid
import PageHeader from '@/components/Header'

// cria o contexto
const ThemeContext = createContext( {} as ContextType )

// cria o provider
export const ThemeProvider = ( { children }: Props ) => {
  const breakpoints = useBreakpoint()
  const [
    isDark,
    setIsDark
  ] = usePersistedState<boolean>( 'isDark', false )
  const [
    menuCollapsed,
    setMenuCollapsed
  ] = usePersistedState<boolean>( 'menuCollapsed', false )
  const [
    schema,
    setSchema
  ] = useState<ThemeType>( LightTheme )
  const [
    isWidescreen,
    setIsWidescreen
  ] = useState<boolean>( false )
  const [
    header,
    setHeader
  ] = useState<ReactNode>(
    <PageHeader
      title={ 'App Tools' }
    />
  )
  const [
    customComponents,
    setCustomComponents
  ] = useState<CustomComponentsType>( lightThemeCustomComponents )
  const colors = isDark ? darkThemeColors : lightThemeColors
  // tamanho do menu lateral pequeno
  const collapsedMenuWidth = useRef<number>( 64 ).current
  // tamanho do menu lateral expandido
  const expandedMenuWidth = useRef<number>( collapsedMenuWidth * 3.5 ).current
  // tamanho dos botões do menu lateral
  const menuButtonsHeight = useRef<number>( 54 ).current
  // tamanho do avatar no menu lateral
  const menuAvatarSize = useRef<number>( 48 ).current

  const exported = useMemo<ContextType>( () => ( {
    schema,
    header,
    setHeader,
    isDark,
    setIsDark,
    menuCollapsed,
    setMenuCollapsed,
    isWidescreen,
    colors,
    darkThemeColors,
    lightThemeColors,
    customComponents,
    collapsedMenuWidth,
    expandedMenuWidth,
    menuButtonsHeight,
    menuAvatarSize
  } ), [
    schema,
    header,
    isWidescreen,
    menuCollapsed
  ] )

  useEffect( () => {
    setSchema( () => isDark ? DarkTheme : LightTheme )
    setCustomComponents( () => isDark ? darkThemeCustomComponents : lightThemeCustomComponents )
  }, [ isDark ] )

  useEffect( () => {
    document.body.style.background = schema.token!.colorBgBase ?? 'white'
  }, [ schema ] )

  useEffect( () => {
    setIsWidescreen( () => !( breakpoints.xs || (
      breakpoints.sm && !breakpoints.xl
    ) ) )
  }, [ breakpoints ] )

  return (
    <ThemeContext.Provider
      value={ exported }
    >
      <ConfigProvider
        locale={ ptBR }
        theme={ schema }
      >
        <App
          style={ {
            width: '100%'
          } }
        >
          <ModalsProvider>
            { children }
          </ModalsProvider>
        </App>
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}

/**
 * cria o hook do contexto
 *
 * @return {ContextType} context
 */
export function useTheme(): ContextType {
  const context = useContext( ThemeContext )
  if ( !context ) throw new Error( 'Theme context invalid' )
  return context
}
