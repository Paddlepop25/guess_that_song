require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
// const fetch = require('node-fetch')
// const cors = require('cors')
var request = require('request') // "Request" library
const mysql = require('mysql2/promise')

const app = express()
app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(cors())

const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

const pool = mysql.createPool({
  host: process.env.MYSQL_SERVER || 'localhost',
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: process.env.MYSQL_CON_LIMIT || 4,
  timezone: '+08:00',
})

const makeSQLQuery = (sql, pool) => {
  return async (args) => {
    const conn = await pool.getConnection()
    try {
      let results = await conn.query(sql, args || [])
      return results[0] // index0 = data, index1 = metadata
    } catch (error) {
      console.error('Error in making SQL query >>>', error)
    } finally {
      conn.release()
    }
  }
}

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const TRACKS_ENDPOINT = 'https://api.spotify.com/v1/tracks?ids='
// const ENDPOINT = 'https://api.spotify.com/v1/tracks/'
// const JOHN_MAYER_URL = ENDPOINT + process.env.JOHN_MAYER

const JOHN_MAYER = process.env.JOHN_MAYER
const MEGHAN_TRAINOR = process.env.MEGHAN_TRAINOR
const ERIC_CLAPTON = process.env.ERIC_CLAPTON
const JOHN_LEGEND = process.env.JOHN_LEGEND
const COLDPLAY = process.env.COLDPLAY
const GUITAR_HEROES = `${TRACKS_ENDPOINT}${JOHN_MAYER}%2C${MEGHAN_TRAINOR}%2C${ERIC_CLAPTON}%2C${JOHN_LEGEND}%2C${COLDPLAY}`
// console.log('GUITAR_HEROES ---> ', GUITAR_HEROES)

const authOptions = {
  url: `${TOKEN_ENDPOINT}`,
  headers: {
    Authorization:
      'Basic ' +
      new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
  },
  form: {
    grant_type: 'client_credentials',
  },
  json: true,
}

// test
app.get('/', (req, res) => {
  res.status(200)
  res.type('application/json')
  res.json({ Hello: 'Kitty' })
})

request.post(authOptions, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    // use the access token to access the Spotify Web API
    var token = body.access_token
    var options = {
      // url: 'https://api.spotify.com/v1/tracks?ids=2jdAk8ATWIL3dwT47XpRfu%2C5jE48hhRu8E6zBDPRSkEq7%2C612VcBshQcy4mpB2utGc3H%2C0vaLIgHcJM3Fs3jxN9MxPm%2C1mea3bSkSGXuIRvnydlB5b',
      url: `${GUITAR_HEROES}`,
      // url: `${JOHN_MAYER_URL}`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
      json: true,
    }
    request.get(options, function (error, response, body) {
      const guitar_heroes_result = body['tracks']
      // console.log('guitar_heroes_result ---> ', guitar_heroes_result)

      let guitar_heroes_arr = []
      for (let i = 0; i < guitar_heroes_result.length; i++) {
        let obj = {}
        obj.artist = guitar_heroes_result[i]['album']['artists'][0]['name']
        obj.title = guitar_heroes_result[i]['name']
        obj.preview = guitar_heroes_result[i]['preview_url']
        obj.image = guitar_heroes_result[i]['album']['images'][1]['url']
        obj.uri = guitar_heroes_result[i]['uri']
        guitar_heroes_arr.push(obj)
      }
      // console.log(guitar_heroes_arr)

      app.get('/guitar_heroes', (req, res) => {
        res.status(200)
        res.type('application/json')
        res.send(guitar_heroes_arr)
      })
    })
  }
})

const SQL_READ_ALL_DB = `SELECT * FROM songs;`
const getAllSongs = makeSQLQuery(SQL_READ_ALL_DB, pool)

app.get('/allsongs', (req, res) => {
  getAllSongs([])
    .then((results) => {
      // console.info(results[0])
      res.status(200).json(results)
    })
    .catch((error) => {
      console.error('Error in reading from SQL >>> ', error)
      res.status(500).end()
    })
})

// const SQL_READ_ONE_DB = 'SELECT * FROM songs WHERE id=?'
// const getOneSong = makeSQLQuery(SQL_READ_ONE_DB, pool)

// app.get('/song/:id', async (req, res) => {
//   const id = parseInt(req.params['id'])
//   // console.log(id)

//   await getOneSong(id)
//     .then((result) => {
//       console.info(result)
//       res.status(200).json(result)
//     })
//     .catch((error) => {
//       console.error('Error in reading from SQL >>> ', error)
//       res.status(500).end()
//     })
// })

// app.get('/song1', (req, res) => {
//   const body = { grant_type: 'client_credentials' }
//   // Basic <base64 encoded client_id:client_secret>
//   const authString = new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString(
//     'base64'
//   )
//   fetch(TOKEN_ENDPOINT, {
//     method: 'post',
//     // body: JSON.stringify(body),
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//       Authorization: 'Basic ' + authString,
//     },
//   })
// fetch documentation
// const body = { a: 1 };
// fetch('https://httpbin.org/post', {
//         method: 'post',
//         body:    JSON.stringify(body),
//         headers: { 'Content-Type': 'application/json' },
//     })
//     .then(res => res.json())
//     .then(json => console.log(json));
// .then((result) => {
//   console.log(result)
//   result.json()
// })
// .then((token) => {
//   console.info('token ---> ', token)
// })
// .catch((error) => {
//   console.error('fetch token error ---> ', error)
// })
// do fetch again with token for url
// })

app.listen(PORT, () => {
  console.info(`Application started on port ${PORT} on ${new Date()}`)
})
