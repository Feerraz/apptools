import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import env from '@/env'

const { serviceAccount } = env()
const app = initializeApp( serviceAccount )
export const auth = getAuth( app )

export default app
