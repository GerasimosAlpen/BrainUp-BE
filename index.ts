import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import routes from './src/routes'
import { env } from './src/config/env'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'))

app.get('/', (_req, res) => {
  res.json({ message: 'BrainUp API' })
})

// health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// main routes
app.use('/api', routes)

// run server only on non test env
if (env.NODE_ENV !== 'test') {
  app.listen(env.PORT, () => {
    console.log(`🚀 API running at ${env.APP_URL}`)
  })
}

export default app