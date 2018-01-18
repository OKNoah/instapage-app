import test from 'tape'
import login from './auth'
import { wrapper } from './utils'

const body = {
  email: process.env.EMAIL,
  password: process.env.PASSWORD
}

test('authenticate', async (t) => {
  await wrapper(login, body)

  t.ok('should not throw error')
  t.ok(body.password, 'should be password')
  t.ok(body.email, 'should be email')
  t.end()
})
