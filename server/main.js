require('dotenv').config()

const fs = require('fs')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const request = require('request')
const mysql = require('mysql2/promise')
const sha1 = require('sha1')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const multer = require('multer')
const AWS = require('aws-sdk')
const multerS3 = require('multer-s3')

const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

const pool = mysql.createPool({
  host: process.env.MYSQL_SERVER || 'localhost',
  user: process.env.MYSQL_USERNAME,
  port: process.env.MYSQL_SVR_PORT,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: process.env.MYSQL_CON_LIMIT || 4,
  connectTimeout: 20000,
  waitForConnections: true,
  // comment out ssl if running locally. this is for connecting to digital ocean
  ssl: {
    ca: fs.readFileSync(__dirname + '/certs/ca-certificate.crt'),
  },
  timezone: '+08:00',
})

const makeSQLQuery = (sql, pool) => {
  return async (args) => {
    const conn = await pool.getConnection()
    try {
      let results = await conn.query(sql, args || [])
      return results[0]
    } catch (error) {
      console.error('Error in making SQL query >>>', error)
    } finally {
      conn.release()
    }
  }
}

const AWS_S3_HOSTNAME = process.env.AWS_S3_HOSTNAME
const AWS_S3_ACCESS_KEY = process.env.AWS_S3_ACCESS_KEY
const AWS_S3_SECRET_ACCESSKEY = process.env.AWS_S3_SECRET_ACCESSKEY
const AWS_S3_BUCKETNAME = process.env.AWS_S3_BUCKETNAME

const spacesEndpoint = new AWS.Endpoint('sfo2.digitaloceanspaces.com')

const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: AWS_S3_ACCESS_KEY,
  secretAccessKey: AWS_S3_SECRET_ACCESSKEY,
})

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: AWS_S3_BUCKETNAME,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {
        mediaType: file.mimetype,
        fileName: file.fieldname,
        originalFilename: file.originalname,
        uploadDatetime: new Date().toString(),
      })
    },
    key: function (request, file, cb) {
      console.log('file ---> ', file)
      cb(null, new Date().getTime() + '_' + file.originalname)
    },
  }),
}).single('upload')

const MAP_ACCESS_TOKEN = process.env.MAP_ACCESS_TOKEN
const PASSPORT_TOKEN_SECRET = process.env.PASSPORT_TOKEN_SECRET

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const TRACKS_ENDPOINT = 'https://api.spotify.com/v1/tracks?ids='

// guitar_heroes
const JOHN_MAYER = process.env.JOHN_MAYER
const ERIC_CLAPTON = process.env.ERIC_CLAPTON
const COLDPLAY = process.env.COLDPLAY
const EAGLES = process.env.EAGLES
const JIMI_HENDRIX = process.env.JIMI_HENDRIX
const TOMMY_EMMANUEL = process.env.TOMMY_EMMANUEL
const GUITAR_HEROES = `${TRACKS_ENDPOINT}${JOHN_MAYER}%2C${ERIC_CLAPTON}%2C${COLDPLAY}%2C${EAGLES}%2C${JIMI_HENDRIX}%2C${TOMMY_EMMANUEL}`

// pop
const MICHAEL_JACKSON = process.env.MICHAEL_JACKSON
const JAMES_BLUNT = process.env.JAMES_BLUNT
const AVRIL_LAVIGNE = process.env.AVRIL_LAVIGNE
const ADELE = process.env.ADELE
const BILLY_JOEL = process.env.BILLY_JOEL
const BRUNO_MARS = process.env.BRUNO_MARS
const POP = `${TRACKS_ENDPOINT}${MICHAEL_JACKSON}%2C${JAMES_BLUNT}%2C${AVRIL_LAVIGNE}%2C${ADELE}%2C${BILLY_JOEL}%2C${BRUNO_MARS}`

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

const makeAuthMiddleware = (passport) => {
  return (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      // console.log('error ---> ', err)
      // console.log('user ---> ', user)
      if (null != err || !user) {
        res.status(401)
        res.type('application/json')
        res.json({ error: err })
        return
      }
      req.user = user
      next()
    })(req, res, next)
  }
}
const SQL_GET_USER = `SELECT * FROM users where username=?`
const getUser = makeSQLQuery(SQL_GET_USER, pool)

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    (req, user, password, done) => {
      // console.info(`username: ${user}, password: ${password}`)
      // console.log('req >>>> ', req)

      // perform authentication
      getUser([user]).then((result) => {
        // console.log('result ---> ', result) // logging from db

        // if (result.length <= 0) {
        //   console.log(' >>> No such username in db <<< ')
        //   return
        // }

        if (result.length > 0) {
          const sqlUser = result[0].username
          const sqlPassword = result[0].password

          if (user == sqlUser && sha1(password) == sqlPassword) {
            console.log(' >>> Username & PW matches mySQL <<< ')
            done(null, {
              username: user,
              loginTime: new Date().toString(),
            })
            return
          }
          // incorrect login
          done('Incorrect username and password', false)
        }
      })
    }
  )
)

const localStrategyAuth = makeAuthMiddleware(passport)

async function sendMail(user) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_EMAIL_PASSWORD,
    },
  })

  let mailOptions = {
    from: 'Guess That Song 🎵 ',
    to: user.email, // possible to send to list of receivers
    subject: 'Congratulations! You are registered 💌 ',
    html: `<h3>Hello ${user.username}</h3>
        <p>You can now play GUESS THAT SONG 🥁🎹🎸. All the best!</p>`,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('ERROR in sending email to user >>>> ', error)
    } else {
      console.log('Email sent >>>> ' + info.response)
    }
  })
}

const app = express()
app.use(morgan('combined'))
app.use(cors({ origin: '*' }))
app.use(passport.initialize())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.status(200)
  res.type('application/json')
  res.json(MAP_ACCESS_TOKEN)
})

const SQL_REGISTER_USER = `INSERT into users (username, password, email, image_key, timestamp ) values (?, ?, ?, ?, CURDATE())`
const registerUsers = makeSQLQuery(SQL_REGISTER_USER, pool)

app.post('/register', (req, res) => {
  // upload to S3
  upload(req, res, (error) => {
    if (error) {
      console.log('error ---> ', error)
      return res.status(500).json(error.message)
    }
    console.log('File uploaded successfully.')
    const user = req.body
    // console.info('req.body >>> ', req.body) // shows Object of username, email, password (unhashed)
    const username = req.body.username
    const email = req.body.email
    const password = sha1(req.body.password)
    const image_key = res.req.file.location

    registerUsers([username, password, email, image_key])
      .then((user) => {
        console.log('Registering user success >>>> ', user)
        res.status(200).json({
          Message: 'Success in registering new user',
          res_image: res.req.file.location,
          res_image_key: res.req.file.key,
        })
      })
      .catch((error) => {
        console.error('ERROR registering user >>>> ', error)
        res.status(500).json(error)
        return
      })

    sendMail(user)

    // console.log('res ---> ', res)
    // save the res in text file and search for url (in location) and key for retrieving
    res.status(200).json({
      message: 'file is uploaded!',
      res_image: res.req.file.location,
      res_image_key: res.req.file.key,
    })
  })
})

app.post(
  '/login',
  localStrategyAuth, // middleware written above
  (req, res) => {
    // console.log('REQ >>>>>>', req)
    // console.log('RES >>>>>>', res)

    const username = req.user.username
    // generate JWT token
    const timestamp = new Date().getTime() / 1000
    const token = jwt.sign(
      {
        sub: req.user.username,
        iss: 'guessthatsong',
        iat: timestamp, // need to be in seconds
        exp: timestamp + 60 * 60, // only available for an hour
        data: {
          // your own information can come from database, etc
          loginTime: req.user.loginTime,
          username: req.user.username,
        },
      },
      PASSPORT_TOKEN_SECRET
    )
    // console.info(`user: `, req.user) // user is created by passport and give us info

    // generate JWT token
    getUser([username]).then((result) => {
      if (result.length > 0) {
        // console.log(result)
        // console.log(result[0]['user_id'])
        userId = result[0]['user_id']

        res.status(200)
        res.type('application/json')
        console.log(userId)

        res.json({
          userId,
          username,
          message: `Login at ${new Date()}`,
          token,
        })
      }
    })
  }
)

request.post(authOptions, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    // use the access token to access the Spotify Web API
    let token = body.access_token
    let options_guitar_heroes = {
      url: `${GUITAR_HEROES}`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
      json: true,
    }

    let options_pop = {
      url: `${POP}`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
      json: true,
    }

    // guitar_heores
    request.get(options_guitar_heroes, function (error, response, body) {
      const guitar_heroes_result = body['tracks']

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

      app.get('/guessthatsong/guitar_heroes', (req, res) => {
        res.status(200)
        res.type('application/json')
        res.send(guitar_heroes_arr)
      })
    })

    // pop
    request.get(options_pop, function (error, response, body) {
      const pop_result = body['tracks']

      let pop_arr = []
      for (let i = 0; i < pop_result.length; i++) {
        let obj = {}
        obj.artist = pop_result[i]['album']['artists'][0]['name']
        obj.title = pop_result[i]['name']
        obj.preview = pop_result[i]['preview_url']
        obj.image = pop_result[i]['album']['images'][1]['url']
        obj.uri = pop_result[i]['uri']
        pop_arr.push(obj)
      }

      app.get('/guessthatsong/pop', (req, res) => {
        res.status(200)
        res.type('application/json')
        res.send(pop_arr)
      })
    })
  }
})

const SQL_GET_ONE_ARTIST_GUITAR_HEROES =
  'SELECT * FROM guitar_heroes WHERE artist=?'
const getOneArtistGuitarHeroes = makeSQLQuery(
  SQL_GET_ONE_ARTIST_GUITAR_HEROES,
  pool
)

app.get('/guessthatsong/guitar_heroes/:artist', async (req, res) => {
  const artist = req.params['artist']

  await getOneArtistGuitarHeroes(artist)
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((error) => {
      console.error('Error in reading from SQL >>> ', error)
      res.status(500).end()
    })
})

const SQL_GET_ONE_ARTIST_POP = 'SELECT * FROM pop WHERE artist=?'
const getOneArtistPop = makeSQLQuery(SQL_GET_ONE_ARTIST_POP, pool)

app.get('/guessthatsong/pop/:artist', async (req, res) => {
  const artist = req.params['artist']

  await getOneArtistPop(artist)
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((error) => {
      console.error('Error in reading from SQL >>> ', error)
      res.status(500).end()
    })
})

// score for guitar_heroes game
const SQL_INSERT_SCORE = `INSERT into scores (genre, score, timestamp, user_id)
values (?, ?, CURDATE(), ?);`
const insertScoreGuitarHeores = makeSQLQuery(SQL_INSERT_SCORE, pool)

app.post('/score', (req, res) => {
  const genre = req.body.genre
  const score = req.body.score
  const user_id = req.body.user_id

  insertScoreGuitarHeores([genre, score, user_id])
    .then((score) => {
      console.log('SCORE added to database >>>> ', score)
      res.status(200).json({ Message: 'Score added' })
    })
    .catch((error) => {
      console.error('ERROR in adding score to database >>>> ', error)
      res.status(500).json({ 'ERROR in adding score': error })
    })
})

pool
  .getConnection()
  .then((conn) => {
    const param1 = Promise.resolve(conn)
    const param2 = conn.ping()
    return Promise.all([param1, param2])
  })
  .then((result) => {
    const conn = result[0]
    app.listen(PORT, () => {
      console.info(`Application started on port ${PORT} on ${new Date()}`)
    })
    conn.release()
  })
  .catch((error) => {
    console.error('ERROR in connecting to mySQL >>>> ', error)
  })
