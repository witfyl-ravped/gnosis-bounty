import { Urbit } from '@urbit/http-api'
const api = new Urbit('', '', 'gnosis')

if (typeof window !== 'undefined') {
  // @ts-ignore
  console.log('inside useUrbit: ', window.ship)
  // @ts-ignore
  api.ship = window.ship
}

// @ts-ignore
// window.api = api

export default api
