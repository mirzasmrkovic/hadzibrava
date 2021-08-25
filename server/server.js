require('dotenv').config()
import express from 'express'
import path from 'path'

import { openIntercom, closeDoor, openDoor, authorize } from './controllers'

const port = process.env.PORT || 4000
const app = express()

// middleware
app.disable('x-powered-by')
// serving static react build
app.use(express.static(path.join(__dirname, '../brava-fe/build')))

// Auth
app.post('/auth', authorize)

// Endpoints
app.post('/intercom/open/', openIntercom)
app.post('/door/close/', closeDoor)
app.post('/door/open/', openDoor)

app.listen(port, () => {
  console.log(`Server live @port ${port}`)
})
