import * as dotenv from 'dotenv'
dotenv.config()

export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/vaccine-api',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'tj670==5H'
}
