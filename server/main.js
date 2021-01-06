require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const fetch = require('node-fetch')
// const cors = require('cors')

const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

const app = express()
app.use(morgan('combined'))
// app.use(cors())

// test
app.get('/', (req, res) => {
  res.status(200)
  res.type('application/json')
  res.json({ Hello: 'Kitty' })
})

app.listen(PORT, () => {
  console.info(`Application started on port ${PORT} on ${new Date()}`)
})
