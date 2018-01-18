import express from 'express'
import proxy from 'instapage-proxy'
import bodyParser from 'body-parser'
import * as pages from './src/landing-page'
import login from './src/auth'

const app = express()

app.use(bodyParser.json())

app.get('/landing-page', login, pages.get)
app.post('/landing-page', login, pages.post)
app.get('/pages/:page', proxy)

/*
  A cool server start message is totally necessary.
*/
app.listen(process.env.PORT || 3000, async () => {
  const message = '💁‍♀ 📱 🛍'.split(' ')
  message.push('  ✅ Online!\n')
  const delay = () => new Promise(resolve => setTimeout(() => resolve(true), 100))

  for (let i = 0; i < message.length; i++) {
    await delay()
    process.stdout.write(message[i] + '  ')
  }
})
