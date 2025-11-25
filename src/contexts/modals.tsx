import {
  createContext,
  useContext,
  useMemo
} from 'react'
import { App } from 'antd'

// types
import { Props } from '@/types'
import { MessageInstance } from 'antd/es/message/interface'
import { NotificationInstance } from 'antd/es/notification/interface'
import {
  ModalFunc,
  ModalStaticFunctions
} from 'antd/es/modal/confirm'
type ContextType = {
  message: MessageInstance
  modal: Omit<ModalStaticFunctions, 'warn'>
  notification: NotificationInstance
  confirm: ModalFunc
}

// cria o contexto
const ModalsContext = createContext( {} as ContextType )

// cria o provider
export const ModalsProvider = ( { children }: Props ) => {
  const {
    message,
    modal,
    notification
  } = App.useApp()
  const { confirm } = modal

  return (
    <ModalsContext.Provider
      value={ useMemo( () => ( {
        message,
        modal,
        notification,
        confirm
      } ), [
        message,
        modal,
        notification,
        confirm
      ] ) }
    >
      { children }
    </ModalsContext.Provider>
  )
}

/**
 * cria o hook do contexto
 *
 * @return {ContextType} context
 */
export function useModals(): ContextType {
  const context = useContext( ModalsContext )
  if ( !context ) throw new Error( 'Modals context invalid' )
  return context
}
