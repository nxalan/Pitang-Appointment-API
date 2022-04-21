import helmet from 'helmet'
import { Express } from 'express'

export default (app: Express): void => {
  app.use(helmet())
}
