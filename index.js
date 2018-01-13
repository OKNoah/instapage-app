import express from 'express'
import proxy from 'instapage-proxy'

const app = express()

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
