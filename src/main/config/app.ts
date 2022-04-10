import express from 'express'
import setupMiddlewares from './middlewares'
import * as dotenv from 'dotenv'

const app = express()
dotenv.config()
setupMiddlewares(app)
export default app
