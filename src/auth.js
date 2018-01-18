import { client, getSessionId, getToken } from './utils'

const { EMAIL, PASSWORD } = process.env

export default async function login (req, res, next) {
  const endpoint = '/auth/login'
  const initial = await client.get(endpoint)

  const cookies = await getSessionId(initial)

  const token = await getToken(initial.body)

  const options = {
    followRedirect: false,
    form: true,
    headers: cookies,
    body: {
      email: EMAIL,
      password: PASSWORD,
      'csrf-token': token,
      uri: ''
    }
  }
  const response = await client.post(endpoint, options)

  req.user = await getSessionId(response)

  next()
}
