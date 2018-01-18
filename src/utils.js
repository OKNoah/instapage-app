import got from 'got'
import { parse } from 'cookie'

const HOST = `https://app.instapage.com`

/*
  Just wraps the client and adds the HOST to each request by default.
*/
const client = {
  methods: ['get', 'post']
}

client.methods.map((method) => {
  client[method] = (path, options) => got[method](`${HOST}${path}`, options)
})

/*
  Simple wrapper to create mimick express and pass back response. For testing.
*/
const wrapper = (func, body) => new Promise((resolve) => {
  func({ ...body }, {
    send: (status, response) => {
      resolve({ status, response })
    },
    set: (obj) => {
      resolve(obj)
    }
  }, (data) => resolve(data))
})

const getToken = async (data) => {
  const formAttributes = data.split('name="csrf-token"')[1]

  const string = /".+"/g.exec(formAttributes)[0].replace(/"/g, '')
  return string
}

const getSessionId = async (response) => {
  const PHPSESSID = parse(response.headers['set-cookie'].join('; ')).PHPSESSID

  return { Cookie: `PHPSESSID=${PHPSESSID};` }
}

export { client, getSessionId, getToken, wrapper }
