import { ReactNode } from 'react'
import * as Icons from 'react-icons/tb'

export type IconListType = keyof typeof Icons

// children page pros type
export type Props = {
  children?: ReactNode
}
