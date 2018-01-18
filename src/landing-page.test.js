import test from 'tape'
import { wrapper } from './utils'
import { post, get } from './landing-page'
import login from './auth'

test('get pages', async (t) => {
  const auth = await wrapper(login)
  const { status, response } = await wrapper(get)

  t.equal(status, 200, 'should be status 200')
  t.ok(typeof response.data === 'object', 'should have data')
  t.end()
})

test('post page', async (t) => {
  const { status, response } = await wrapper(post)

  t.equal(status, 200, 'should be status 200')
  t.equal(typeof response.data, 'string', 'should return string')
  t.end()
})
