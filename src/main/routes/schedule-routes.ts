/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
export default (router: Router): void => {
  router.post('/signup')
  router.post('/login')
}
