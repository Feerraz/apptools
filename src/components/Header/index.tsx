import Head from 'next/head'
import { ReactNode } from 'react'
import {
  Affix,
  Space,
  Typography
} from 'antd'

// components
const { Title } = Typography

// styles
import Styles from './styles'

// types
type ComponentsType = {
  title: string
  breadcrumb?: ReactNode
  help?: ReactNode
  extra?: ReactNode
}

/**
 * Pageheader component
 *
 * @param {ComponentsType} params
 * @return {ReactNode} component
 */
function Index( {
  title,
  breadcrumb,
  help,
  extra
}: ComponentsType ): ReactNode {
  const S = Styles()

  return (
    <Affix
      offsetTop={ 0 }
    >
      <div
        style={ S.Container }
      >
        <Space
          orientation='vertical'
          style={ S.SubContainer }
        >
          <div
            style={ S.Breadcrumb }
          >
            { breadcrumb }

            { help }
          </div>

          <div
            style={ S.Title }
          >
            <Title
              level={ 2 }
              style={ S.Title }
            >
              { title }
            </Title>

            { extra }
          </div>
        </Space>
      </div>
    </Affix>
  )
}

/**
 * Next meta header component
 *
 * @return { ReactNode } component
 */
export function MetaHeader(): ReactNode {
  return ( <Head>
    <title>App Tools</title>
    <meta name='apptools' content='apptools' />
    <meta name='viewport' content='initial-scale=1, width=device-width' />
    <link rel='icon' href='/favicon.ico' />
  </Head> )
}

export default Index
