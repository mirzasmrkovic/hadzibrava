require('dotenv').config()
import express from 'express'
import path from 'path'

import { openIntercom, closeDoor, openDoor, authorize } from './controllers'

const port = process.env.PORT || 3000
const app = express()

// middleware
app.disable('x-powered-by')
// serving static html
app.use(express.static(path.join(__dirname, '../public')))

// Auth
app.post('/auth', authorize)

// Endpoints
app.post('/intercom/open/', openIntercom)
app.post('/door/close/', closeDoor)
app.post('/door/open/', openDoor)

app.listen(port, () => {
  console.log(`Server live @port ${port}`)
})
