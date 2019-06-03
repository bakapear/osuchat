let irc = require('./irc')
let got = require('got')
let url = process.env.HOOK

let client = new irc.Client('irc.ppy.sh', process.env.NAME, {
  channels: ['#osu'], port: '6667', password: process.env.PASS
})

client.addListener('message', function (from, to, message) {
  message = message.replace(/@everyone|@here/g, '@everybody')
  post(from, message)
})

function post (name, message) {
  try {
    got.post(url, {
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        'username': name,
        'avatar_url': 'https://i.imgur.com/SYlWC1n.png',
        'content': message
      },
      json: true
    })
  } catch (e) { console.log('POST - ' + e) }
}

process.on('unhandledRejection', () => { console.log('yep') })
