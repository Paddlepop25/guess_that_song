require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const fetch = require('node-fetch')
// const cors = require('cors')
var request = require('request') // "Request" library

const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

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

const app = express()
app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(cors())

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
      // console.log('body ---> ', body)
      // console.log('body ---> ', body['tracks'])

      // John Mayer
      const john_mayer = body['tracks'][0]
      // console.log('john mayer ---> ', john_mayer)
      // console.log('album ---> ', john_mayer['album']) // massive
      // console.log('artist ---> ', john_mayer['album']['artists'][0]['name'])
      // console.log('john mayer title ---> ', john_mayer['name'])
      // console.log('preview url ---> ', john_mayer['preview_url'])
      // console.log('images ---> ', john_mayer['album']['images'][1]['url']) // medium sized
      // console.log('uri ---> ', john_mayer['uri'])

      johnMayerArtist = john_mayer['album']['artists'][0]['name']
      johnMayerSongTitle = john_mayer['name']
      johnMayerPreviewUrl = john_mayer['preview_url']
      console.log('>>>>>>> ', johnMayerArtist) // ok
      johnMayerImage = john_mayer['album']['images'][1]['url']
      johnMayerURI = john_mayer['uri']

      // Meghan Trainer
      const meghan_trainer = body['tracks'][1]
      // console.log('meghan_trainer ---> ', meghan_trainer)
      // console.log('album ---> ', meghan_trainer['album']) // massive
      // console.log('artist ---> ', meghan_trainer['album']['artists'][0]['name'])
      // console.log('meghan_trainer title ---> ', meghan_trainer['name'])
      // console.log('preview url ---> ', meghan_trainer['preview_url'])
      // console.log('images ---> ', meghan_trainer['album']['images'][1]['url']) // medium sized
      // console.log('uri ---> ', meghan_trainer['uri'])

      meghanTrainerArtist = meghan_trainer['album']['artists'][0]['name']
      console.log('>>>>>>> ', meghanTrainerArtist) // ok
      meghanTrainerSongTitle = meghan_trainer['name']
      meghanTrainerPreviewUrl = meghan_trainer['preview_url']
      meghanTrainerImage = meghan_trainer['album']['images'][1]['url']
      meghanTrainerURI = meghan_trainer['uri']

      // Meghan Trainer
      const eric_clapton = body['tracks'][2]
      // console.log('eric_clapton ---> ', eric_clapton)
      // console.log('album ---> ', eric_clapton['album']) // massive
      // console.log('artist ---> ', eric_clapton['album']['artists'][0]['name'])
      // console.log(
      //   'eric_clapton title ---> ',
      //   eric_clapton['name'].substring(0, 15)
      // )
      // console.log('preview url ---> ', eric_clapton['preview_url'])
      // console.log('images ---> ', eric_clapton['album']['images'][1]['url']) // medium sized
      // console.log('uri ---> ', eric_clapton['uri'])

      ericClaptonArtist = eric_clapton['album']['artists'][0]['name']
      console.log('>>>>>>> ', ericClaptonArtist) // ok
      ericClaptonSongTitle = eric_clapton['name'].substring(0, 15)
      ericClaptonPreviewUrl = eric_clapton['preview_url']
      ericClaptonImage = eric_clapton['album']['images'][1]['url']
      ericClaptonURI = eric_clapton['uri']

      // John Legend
      const john_legend = body['tracks'][3]
      // console.log('john legend ---> ', john_legend)
      // console.log('artist ---> ', john_legend['album']['artists'][0]['name'])
      // console.log('john legend title ---> ', john_legend['name'])
      // console.log('preview url ---> ', john_legend['preview_url'])
      // console.log('images ---> ', john_legend['album']['images'][1]['url']) // medium sized
      // console.log('uri ---> ', john_legend['uri'])

      johnLegendArtist = john_legend['album']['artists'][0]['name']
      console.log('>>>>>>> ', johnLegendArtist) // ok
      johnLegendSongTitle = john_legend['name']
      johnLegendPreviewUrl = john_legend['preview_url']
      johnLegendImage = john_legend['album']['images'][1]['url']
      johnLegendURI = john_legend['uri']

      // Cold Play
      const cold_play = body['tracks'][4]
      // console.log('cold play ---> ', cold_play)
      // console.log('artist ---> ', cold_play['album']['artists'][0]['name'])
      // console.log('cold play title ---> ', cold_play['name'])
      // console.log('preview url ---> ', cold_play['preview_url'])
      // console.log('images ---> ', cold_play['album']['images'][1]['url']) // medium sized
      // console.log('uri ---> ', cold_play['uri'])

      coldPlayArtist = cold_play['album']['artists'][0]['name']
      console.log('>>>>>>> ', coldPlayArtist) // ok
      coldPlaySongTitle = cold_play['name']
      coldPlayPreviewUrl = cold_play['preview_url']
      coldPlayImage = cold_play['album']['images'][1]['url']
      coldPlayURI = cold_play['uri']

      app.get('/guitar_heroes', (req, res) => {
        res.status(200)
        res.type('application/json')
        res.json(john_mayer)
      })
    })
  }
})

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
