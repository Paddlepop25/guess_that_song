require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
// const fetch = require('node-fetch')
const cors = require('cors')
const request = require('request')
const mysql = require('mysql2/promise')
const sha1 = require('sha1')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

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
      return results[0]
    } catch (error) {
      console.error('Error in making SQL query >>>', error)
    } finally {
      conn.release()
    }
  }
}

const PASSPORT_TOKEN_SECRET = process.env.PASSPORT_TOKEN_SECRET

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
const EAGLES = process.env.EAGLES
const GUITAR_HEROES = `${TRACKS_ENDPOINT}${JOHN_MAYER}%2C${MEGHAN_TRAINOR}%2C${ERIC_CLAPTON}%2C${JOHN_LEGEND}%2C${COLDPLAY}%2C${EAGLES}`
// console.log('GUITAR_HEROES >>>> ', GUITAR_HEROES)

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

const SQL_GET_USER = `SELECT * FROM users where username=?`
const getUser = makeSQLQuery(SQL_GET_USER, pool)

const makeAuthMiddleware = (passport) => {
  return (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      // console.log('error ---> ', err)
      // console.log('user ---> ', user)
      if (null != err || !user) {
        res.status(401)
        res.type('application/json')
        res.json({ error: err }) // getting error
        return
      }
      req.user = user
      next()
    })(req, res, next)
  }
}

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
        // console.log('result.length ---> ', result.length) // 1
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
  // create reusable transporter object using the default SMTP transport
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
    from: 'Guess That Song 🎵 ', // sender address
    to: user.email, // possible to send to list of receivers
    subject: 'Congratulations! You are registered 💌 ', // subject line
    html: `<h3>Hello ${user.username}</h3>
        <p>You can now play GUESS THAT SONG 🎶. All the best!</p>`,
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
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())

// test
app.get('/', (req, res) => {
  res.status(200)
  res.type('application/json')
  res.json({ Hello: 'Kitty' })
})

const SQL_REGISTER_USER = `INSERT into users (username, password, email, image_key, score, timestamp ) values (?, ?, ?, ?, ?, CURDATE())`
const registerUsers = makeSQLQuery(SQL_REGISTER_USER, pool)

app.post('/register', express.json(), (req, res) => {
  const user = req.body
  // console.info('req.body >>> ', req.body)
  const username = req.body.username
  const email = req.body.email
  const password = sha1(req.body.password)
  // console.log('password >>>> ', password)
  const image_key = req.body.image_key
  const score = req.body.score

  registerUsers([username, password, email, image_key, score])
    .then((user) => {
      console.log('Registering user success >>>> ', user)
      res.status(200).json({ Message: 'Success in registering new user' })
    })
    .catch((error) => {
      console.error('ERROR registering user >>>> ', error)
      res.status(500).json(error)
    })

  sendMail(user)
})

app.post(
  '/login',
  localStrategyAuth, // middleware written above
  (req, res) => {
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
          // security: req.user.security,
          // sign: 'linda',
        },
      },
      PASSPORT_TOKEN_SECRET
    )
    // console.info(`user: `, req.user) // user is created by passport and give us info
    // generate JWT token
    res.status(200)
    res.type('application/json')
    res.json({ message: `Login at ${new Date()}`, token })
  }
)

// look for token in Http Header
// authorization: Bearer <token>
app.get(
  '/protected/secret',
  (req, res, next) => {
    // check if the request has Authorization header
    const auth = req.get('Authorization')
    if (null == auth) {
      res.status(403)
      res.json({ Message: 'Missing authorization header' }) // only for us to know whats happening. in real life don't tell your users too much
      return
    }
    // Check if token is Bearer authorization type (split up the 2)
    // Bearer <token>
    const terms = auth.split(' ')
    if (terms.length < 2 || terms[0] != 'Bearer') {
      res.status(403)
      res.json({ Message: 'Incorrect Authorization' }) // only for us to know whats happening. in real life don't tell your users
      return
    }

    const token = terms[1]
    try {
      // verify token
      const verified = jwt.verify(token, TOKEN_SECRET)
      console.log('verified token --->', verified) // CHECK THIS
      req.token = verified // so next part can get the token
      next()
    } catch (error) {
      res.status(403)
      res.json({ Message: 'Incorrect token', Error: error }) // only for us to know whats happening. in real life don't tell your users
      return
    }
  },
  (req, res) => {
    res.status(200)
    res.json({ destination: 'secret place' }) // can be anything. we use this to protect our token
  }
)

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
      // console.log('guitar_heroes_result >>>> ', guitar_heroes_result)

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

// testing - okay
const SQL_READ_ALL_DB = `SELECT * FROM users;`
const getAllUsers = makeSQLQuery(SQL_READ_ALL_DB, pool)

app.get('/getAllUsers', (req, res) => {
  getAllUsers([])
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
//   console.info('token >>>> ', token)
// })
// .catch((error) => {
//   console.error('fetch token error >>>> ', error)
// })
// do fetch again with token for url
// })

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
