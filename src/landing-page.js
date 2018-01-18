import { client, getToken } from './utils'

export async function post (req, res) {
  const endpoint = '/builder2'

  const initial = await client.get('/templates/index/10930', {
    headers: req.user
  })

  const token = await getToken(initial.body)

  const response = await client.post(endpoint, {
    followRedirect: false,
    headers: req.user,
    form: true,
    body: {
      page_name: req.body.name,
      layout: 10930,
      'csrf-token': token
    }
  })

  const isCreated = response.statusCode === 302

  res.status(isCreated ? 200 : 500).send({ data: response.headers.location })
}


/*
  Gets a list of pages.
*/
export async function get (req, res) {
  const endpoint = '/api/2/pages/get-user-pages'

  const pages = await client.get(endpoint, {
    json: true,
    headers: req.user
  })

  res.status(200).send({ data: pages.body.data })
}
