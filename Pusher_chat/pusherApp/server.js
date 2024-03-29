const express = require('express')
    const bodyParser = require('body-parser')
    const Pusher = require('pusher')
    const cors = require('cors')
    require('dotenv').config()
    const shortId = require('shortid')

    const app = express()
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    const pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID,
      key: process.env.PUSHER_APP_KEY,
      secret: process.env.PUSHER_APP_SECRET,
      cluster: 'us2',
      encrypted: true
    })

    app.post('/message', async (req, res) => {
      // simulate actual db save with id and createdAt added
      const chat = {
        ...req.body,
        id: shortId.generate(),
        createdAt: new Date().toISOString()
      } 
      // trigger this update to our pushers listeners
      pusher.trigger('chat-group', 'chat', chat)
      res.send(chat)
    })

    app.post('/join', (req, res) => {
      const chat = {
        ...req.body,
        id: shortId.generate(),
        type: 'joined',
        createdAt: new Date().toISOString()
      }
      // trigger this update to our pushers listeners
      pusher.trigger('chat-group', 'chat', chat)
      res.send(chat)
    })

    app.listen(process.env.PORT || 2000, () => console.log('Listening at 2000'))