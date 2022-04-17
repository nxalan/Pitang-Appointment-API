import express from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import setupSwagger from './config-swagger'
import setupHelmet from './config-helmet'
import * as dotenv from 'dotenv'

const app = express()
dotenv.config()
setupSwagger(app)
setupHelmet(app)
setupMiddlewares(app)
setupRoutes(app)
export default app
